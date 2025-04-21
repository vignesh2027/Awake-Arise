"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash, Plus, FileText, Users, Clock, Award, CheckCircle, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useSupabase } from "@/components/supabase-provider"
import { getExamById, getQuestionsByExamId } from "@/lib/database"
import type { Question } from "@/lib/database"

export default function ExamDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { profile, loading } = useSupabase()
  const { toast } = useToast()
  const [exam, setExam] = useState<any>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect if not a teacher
    if (!loading && profile && profile.role !== "teacher") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      })
      router.push(`/dashboard/${profile.role}`)
    }

    // Fetch exam details and questions
    const fetchExamDetails = async () => {
      try {
        const [examData, questionsData] = await Promise.all([getExamById(params.id), getQuestionsByExamId(params.id)])

        setExam(examData)
        setQuestions(questionsData)
      } catch (error) {
        console.error("Error fetching exam details:", error)
        toast({
          title: "Error",
          description: "Failed to load exam details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (profile && profile.role === "teacher") {
      fetchExamDetails()
    }
  }, [params.id, profile, loading, router, toast])

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  if (loading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-purple-950 to-black">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
          <p className="text-lg text-purple-300">Loading exam details...</p>
        </div>
      </div>
    )
  }

  if (!exam) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-black via-purple-950 to-black p-4">
        <div className="text-center">
          <XCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
          <h1 className="mb-2 text-2xl font-bold text-purple-100">Exam Not Found</h1>
          <p className="mb-6 text-purple-300">
            The exam you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Button className="bg-purple-700 hover:bg-purple-600" onClick={() => router.push("/dashboard/teacher")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4 text-purple-300 hover:bg-purple-900/30 hover:text-purple-200"
            onClick={() => router.push("/dashboard/teacher")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-purple-100">{exam.title}</h1>
              <p className="mt-1 text-purple-300">
                {exam.subjects?.name || "General"} • Created on {formatDate(exam.created_at)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-purple-800/30 bg-purple-900/30 text-purple-300 hover:bg-purple-800/50"
                onClick={() => router.push(`/dashboard/teacher/exams/${exam.id}/edit`)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Exam
              </Button>
              <Button variant="destructive" className="bg-red-900/30 hover:bg-red-800/50">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardContent className="flex items-center p-4">
              <Clock className="mr-3 h-8 w-8 text-purple-400" />
              <div>
                <p className="text-sm text-purple-300">Duration</p>
                <p className="text-xl font-bold text-purple-100">{exam.duration} minutes</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardContent className="flex items-center p-4">
              <FileText className="mr-3 h-8 w-8 text-purple-400" />
              <div>
                <p className="text-sm text-purple-300">Questions</p>
                <p className="text-xl font-bold text-purple-100">{questions.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardContent className="flex items-center p-4">
              <Award className="mr-3 h-8 w-8 text-purple-400" />
              <div>
                <p className="text-sm text-purple-300">Total Marks</p>
                <p className="text-xl font-bold text-purple-100">{exam.total_marks}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardContent className="flex items-center p-4">
              <Users className="mr-3 h-8 w-8 text-purple-400" />
              <div>
                <p className="text-sm text-purple-300">Attempts</p>
                <p className="text-xl font-bold text-purple-100">0</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-purple-100">Exam Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-purple-400">Description</h3>
                  <p className="mt-1 text-purple-200">{exam.description || "No description provided."}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <h3 className="text-sm font-medium text-purple-400">Status</h3>
                    <div className="mt-1 flex items-center">
                      {exam.is_active ? (
                        <>
                          <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                          <span className="text-green-400">Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="mr-1 h-4 w-4 text-red-500" />
                          <span className="text-red-400">Inactive</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-purple-400">Passing Marks</h3>
                    <p className="mt-1 text-purple-200">
                      {exam.passing_marks} / {exam.total_marks}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-purple-400">Created By</h3>
                    <p className="mt-1 text-purple-200">{exam.profiles?.name || "Unknown"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="questions" className="space-y-4">
          <TabsList className="bg-purple-900/30">
            <TabsTrigger value="questions" className="data-[state=active]:bg-purple-700">
              Questions
            </TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-purple-700">
              Results
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-700">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions">
            <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-purple-100">Questions ({questions.length})</CardTitle>
                <Button
                  className="bg-purple-700 hover:bg-purple-600"
                  onClick={() => router.push(`/dashboard/teacher/exams/${exam.id}/questions/add`)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </CardHeader>
              <CardContent>
                {questions.length > 0 ? (
                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <Card key={question.id} className="border-purple-800/30 bg-purple-900/50">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg text-purple-100">
                              Question {index + 1}
                              <span className="ml-2 text-sm text-purple-400">
                                ({question.marks} {question.marks === 1 ? "mark" : "marks"})
                              </span>
                            </CardTitle>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-purple-400">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-purple-400">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <CardDescription className="text-xs text-purple-400">
                            {question.question_type === "multiple_choice"
                              ? "Multiple Choice"
                              : question.question_type === "true_false"
                                ? "True/False"
                                : "Coding"}{" "}
                            •
                            {question.difficulty
                              ? ` ${question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)} Difficulty`
                              : ""}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-purple-200">{question.question_text}</p>

                          {question.question_type === "multiple_choice" && question.options && (
                            <div className="mt-4 space-y-2">
                              {question.options.map((option) => (
                                <div
                                  key={option.id}
                                  className={`flex items-center rounded-md p-2 ${
                                    option.is_correct
                                      ? "bg-green-900/20 text-green-300"
                                      : "bg-purple-900/20 text-purple-300"
                                  }`}
                                >
                                  <div
                                    className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full border ${
                                      option.is_correct
                                        ? "border-green-500 text-green-500"
                                        : "border-purple-500 text-purple-500"
                                    }`}
                                  >
                                    {option.is_correct ? <CheckCircle className="h-4 w-4" /> : ""}
                                  </div>
                                  <span>{option.option_text}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {question.question_type === "true_false" && (
                            <div className="mt-4 space-y-2">
                              <div
                                className={`flex items-center rounded-md p-2 ${
                                  question.options?.find((o) => o.is_correct)?.option_text === "True"
                                    ? "bg-green-900/20 text-green-300"
                                    : "bg-purple-900/20 text-purple-300"
                                }`}
                              >
                                <div
                                  className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full border ${
                                    question.options?.find((o) => o.is_correct)?.option_text === "True"
                                      ? "border-green-500 text-green-500"
                                      : "border-purple-500 text-purple-500"
                                  }`}
                                >
                                  {question.options?.find((o) => o.is_correct)?.option_text === "True" ? (
                                    <CheckCircle className="h-4 w-4" />
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <span>True</span>
                              </div>

                              <div
                                className={`flex items-center rounded-md p-2 ${
                                  question.options?.find((o) => o.is_correct)?.option_text === "False"
                                    ? "bg-green-900/20 text-green-300"
                                    : "bg-purple-900/20 text-purple-300"
                                }`}
                              >
                                <div
                                  className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full border ${
                                    question.options?.find((o) => o.is_correct)?.option_text === "False"
                                      ? "border-green-500 text-green-500"
                                      : "border-purple-500 text-purple-500"
                                  }`}
                                >
                                  {question.options?.find((o) => o.is_correct)?.option_text === "False" ? (
                                    <CheckCircle className="h-4 w-4" />
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <span>False</span>
                              </div>
                            </div>
                          )}

                          {question.question_type === "coding" && question.coding_question && (
                            <div className="mt-4">
                              <h4 className="mb-2 text-sm font-medium text-purple-300">Starter Code:</h4>
                              <pre className="rounded-md bg-purple-950/50 p-3 text-sm text-purple-200">
                                {question.coding_question.starter_code || "No starter code provided."}
                              </pre>

                              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                  <h4 className="mb-2 text-sm font-medium text-purple-300">Test Cases:</h4>
                                  <pre className="rounded-md bg-purple-950/50 p-3 text-sm text-purple-200">
                                    {JSON.stringify(question.coding_question.test_cases, null, 2)}
                                  </pre>
                                </div>

                                <div>
                                  <h4 className="mb-2 text-sm font-medium text-purple-300">Expected Output:</h4>
                                  <pre className="rounded-md bg-purple-950/50 p-3 text-sm text-purple-200">
                                    {JSON.stringify(question.coding_question.expected_output, null, 2)}
                                  </pre>
                                </div>
                              </div>

                              <p className="mt-4 text-sm text-purple-300">
                                <span className="font-medium">Language:</span> {question.coding_question.language}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <FileText className="mb-4 h-16 w-16 text-purple-500/50" />
                    <h3 className="mb-2 text-xl font-medium text-purple-200">No Questions Added</h3>
                    <p className="mb-4 text-center text-purple-300">
                      This exam doesn't have any questions yet. Add questions to make it available for students.
                    </p>
                    <Button
                      className="bg-purple-700 hover:bg-purple-600"
                      onClick={() => router.push(`/dashboard/teacher/exams/${exam.id}/questions/add`)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Question
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-purple-100">Exam Results</CardTitle>
                <CardDescription className="text-purple-300">View student performance and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8">
                  <Users className="mb-4 h-16 w-16 text-purple-500/50" />
                  <h3 className="mb-2 text-xl font-medium text-purple-200">No Results Yet</h3>
                  <p className="text-center text-purple-300">
                    No students have attempted this exam yet. Results will appear here once students complete the exam.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-purple-100">Exam Settings</CardTitle>
                <CardDescription className="text-purple-300">Configure exam parameters and visibility</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-purple-300">Settings panel will be implemented soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
