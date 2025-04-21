import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Profile types
export type UserRole = "student" | "teacher" | "admin"

export interface Profile {
  id: string // This is the auth user's UUID
  name: string
  email: string
  role: UserRole
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

// Create or update a profile
export async function upsertProfile(profile: Partial<Profile>) {
  const { data, error } = await supabase.from("profiles").upsert([profile]).select()

  if (error) {
    console.error("Error upserting profile:", error)
    throw error
  }

  return data?.[0]
}

// Get a profile by ID (which is the auth user's UUID)
export async function getProfileById(id: string) {
  try {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") {
        // PGRST116 is the error code for "no rows returned"
        console.log(`No profile found for ID: ${id}`)
        return null
      }

      console.error("Error getting profile:", error)
      throw error
    }

    return data as Profile | null
  } catch (error) {
    console.error("Error in getProfileById:", error)
    throw error
  }
}

// Get a profile by email
export async function getProfileByEmail(email: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("email", email).single()

  if (error && error.code !== "PGRST116") {
    console.error("Error getting profile by email:", error)
    throw error
  }

  return data as Profile | null
}

// Subject types
export interface Subject {
  id: string
  name: string
  description?: string
  icon?: string
}

// Get all subjects
export async function getAllSubjects() {
  const { data, error } = await supabase.from("subjects").select("*").order("name")

  if (error) {
    console.error("Error getting subjects:", error)
    throw error
  }

  return data as Subject[]
}

// Exam types
export interface Exam {
  id: string
  title: string
  description?: string
  subject_id: string
  duration: number
  total_marks: number
  passing_marks: number
  is_active: boolean
  created_by: string
  created_at?: string
  updated_at?: string
}

// Get all exams
export async function getAllExams() {
  const { data, error } = await supabase
    .from("exams")
    .select(`
      *,
      subjects:subject_id (name, icon),
      profiles:created_by (name)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error getting exams:", error)
    throw error
  }

  return data
}

// Get exams by subject
export async function getExamsBySubject(subjectId: string) {
  const { data, error } = await supabase
    .from("exams")
    .select(`
      *,
      subjects:subject_id (name, icon),
      profiles:created_by (name)
    `)
    .eq("subject_id", subjectId)
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error getting exams by subject:", error)
    throw error
  }

  return data
}

// Get exam by ID
export async function getExamById(examId: string) {
  const { data, error } = await supabase
    .from("exams")
    .select(`
      *,
      subjects:subject_id (name, icon),
      profiles:created_by (name)
    `)
    .eq("id", examId)
    .single()

  if (error) {
    console.error("Error getting exam:", error)
    throw error
  }

  return data
}

// Question types
export type QuestionType = "multiple_choice" | "true_false" | "coding"
export type QuestionDifficulty = "easy" | "medium" | "hard"

export interface Question {
  id: string
  exam_id: string
  question_text: string
  question_type: QuestionType
  marks: number
  difficulty?: QuestionDifficulty
  options?: Option[]
  coding_question?: CodingQuestion
}

export interface Option {
  id: string
  question_id: string
  option_text: string
  is_correct: boolean
}

export interface CodingQuestion {
  id: string
  question_id: string
  starter_code?: string
  test_cases: any
  expected_output: any
  language: string
}

// Get questions by exam ID
export async function getQuestionsByExamId(examId: string) {
  const { data: questions, error: questionsError } = await supabase
    .from("questions")
    .select("*")
    .eq("exam_id", examId)
    .order("id")

  if (questionsError) {
    console.error("Error getting questions:", questionsError)
    throw questionsError
  }

  // Get options for multiple choice questions
  const questionIds = questions.map((q) => q.id)
  const { data: options, error: optionsError } = await supabase
    .from("options")
    .select("*")
    .in("question_id", questionIds)

  if (optionsError) {
    console.error("Error getting options:", optionsError)
    throw optionsError
  }

  // Get coding question details
  const { data: codingQuestions, error: codingError } = await supabase
    .from("coding_questions")
    .select("*")
    .in("question_id", questionIds)

  if (codingError) {
    console.error("Error getting coding questions:", codingError)
    throw codingError
  }

  // Combine the data
  const questionsWithDetails = questions.map((question) => {
    const questionOptions = options.filter((o) => o.question_id === question.id)
    const codingQuestion = codingQuestions.find((cq) => cq.question_id === question.id)

    return {
      ...question,
      options: questionOptions,
      coding_question: codingQuestion,
    }
  })

  return questionsWithDetails as Question[]
}

// Exam attempt types
export interface ExamAttempt {
  id: string
  exam_id: string
  student_id: string
  start_time: string
  end_time?: string
  score?: number
  is_completed: boolean
}

// Create an exam attempt
export async function createExamAttempt(examId: string, studentId: string) {
  const { data, error } = await supabase
    .from("exam_attempts")
    .insert([
      {
        exam_id: examId,
        student_id: studentId,
        start_time: new Date().toISOString(),
        is_completed: false,
      },
    ])
    .select()

  if (error) {
    console.error("Error creating exam attempt:", error)
    throw error
  }

  return data?.[0] as ExamAttempt
}

// Complete an exam attempt
export async function completeExamAttempt(attemptId: string, score: number) {
  const { data, error } = await supabase
    .from("exam_attempts")
    .update({
      end_time: new Date().toISOString(),
      score,
      is_completed: true,
    })
    .eq("id", attemptId)
    .select()

  if (error) {
    console.error("Error completing exam attempt:", error)
    throw error
  }

  return data?.[0] as ExamAttempt
}

// Answer types
export interface Answer {
  id?: string
  attempt_id: string
  question_id: string
  selected_option_id?: string
  coding_answer?: string
  is_correct?: boolean
  marks_obtained?: number
}

// Submit an answer
export async function submitAnswer(answer: Answer) {
  const { data, error } = await supabase.from("answers").insert([answer]).select()

  if (error) {
    console.error("Error submitting answer:", error)
    throw error
  }

  return data?.[0]
}

// Get answers by attempt ID
export async function getAnswersByAttemptId(attemptId: string) {
  const { data, error } = await supabase.from("answers").select("*").eq("attempt_id", attemptId)

  if (error) {
    console.error("Error getting answers:", error)
    throw error
  }

  return data as Answer[]
}

// Leaderboard types
export interface LeaderboardEntry {
  id: string
  student_id: string
  points: number
  rank?: number
  streak_days: number
  last_active_date: string
  student?: Profile
}

// Get leaderboard
export async function getLeaderboard(limit = 10) {
  const { data, error } = await supabase
    .from("leaderboard")
    .select(`
      *,
      student:profiles!student_id (name, avatar_url)
    `)
    .order("points", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error getting leaderboard:", error)
    throw error
  }

  return data as LeaderboardEntry[]
}

// Update leaderboard entry
export async function updateLeaderboardEntry(studentId: string, pointsToAdd: number) {
  // First, check if the student already has a leaderboard entry
  const { data: existingEntry } = await supabase.from("leaderboard").select("*").eq("student_id", studentId).single()

  if (existingEntry) {
    // Update existing entry
    const { data, error } = await supabase
      .from("leaderboard")
      .update({
        points: existingEntry.points + pointsToAdd,
        last_active_date: new Date().toISOString().split("T")[0],
      })
      .eq("student_id", studentId)
      .select()

    if (error) {
      console.error("Error updating leaderboard entry:", error)
      throw error
    }

    return data?.[0]
  } else {
    // Create new entry
    const { data, error } = await supabase
      .from("leaderboard")
      .insert([
        {
          student_id: studentId,
          points: pointsToAdd,
          streak_days: 1,
          last_active_date: new Date().toISOString().split("T")[0],
        },
      ])
      .select()

    if (error) {
      console.error("Error creating leaderboard entry:", error)
      throw error
    }

    return data?.[0]
  }
}

// Achievement types
export interface Achievement {
  id: string
  name: string
  description: string
  icon?: string
  points: number
}

// Get all achievements
export async function getAllAchievements() {
  const { data, error } = await supabase.from("achievements").select("*").order("points")

  if (error) {
    console.error("Error getting achievements:", error)
    throw error
  }

  return data as Achievement[]
}

// Get student achievements
export async function getStudentAchievements(studentId: string) {
  const { data, error } = await supabase
    .from("student_achievements")
    .select(`
      *,
      achievement:achievements!achievement_id (*)
    `)
    .eq("student_id", studentId)

  if (error) {
    console.error("Error getting student achievements:", error)
    throw error
  }

  return data
}

// Award achievement to student
export async function awardAchievement(studentId: string, achievementId: string) {
  // Check if the student already has this achievement
  const { data: existingAchievement } = await supabase
    .from("student_achievements")
    .select("*")
    .eq("student_id", studentId)
    .eq("achievement_id", achievementId)
    .single()

  if (existingAchievement) {
    // Student already has this achievement
    return existingAchievement
  }

  // Award the achievement
  const { data, error } = await supabase
    .from("student_achievements")
    .insert([
      {
        student_id: studentId,
        achievement_id: achievementId,
        earned_at: new Date().toISOString(),
      },
    ])
    .select()

  if (error) {
    console.error("Error awarding achievement:", error)
    throw error
  }

  // Get the achievement details to update leaderboard
  const { data: achievement } = await supabase.from("achievements").select("points").eq("id", achievementId).single()

  if (achievement) {
    // Update leaderboard with achievement points
    await updateLeaderboardEntry(studentId, achievement.points)
  }

  return data?.[0]
}
