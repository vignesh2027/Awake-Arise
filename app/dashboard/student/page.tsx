"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, FileText, Award, Clock, CheckCircle, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useSupabase } from "@/components/supabase-provider"
import { getAllExams, getLeaderboard } from "@/lib/database"

export default function StudentDashboard() {
  const router = useRouter()
  const { profile, loading } = useSupabase()
  const { toast } = useToast()
  const [exams, setExams] = useState<any[]>([])
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Redirect if not a student
    if (!loading && profile && profile.role !== "student") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the student dashboard.",
        variant: "destructive",
      })
      router.push(`/dashboard/${profile.role}`)
    }

    // Fetch exams and leaderboard
    const fetchData = async () => {
      try {
        const [examsData, leaderboardData] = await Promise.all([getAllExams(), getLeaderboard(10)])

        // Filter only active exams for students
        setExams(examsData.filter((exam: any) => exam.is_active))
        setLeaderboard(leaderboardData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (profile && profile.role === "student") {
      fetchData()
    }
  }, [profile, loading, router, toast])

  // Filter exams based on search query
  const filteredExams = exams.filter(
    (exam) =>
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.subjects?.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-purple-950 to-black">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
          <p className="text-lg text-purple-300">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-100">Student Dashboard</h1>
          <p className="mt-1 text-purple-300">Explore exams and track your progress</p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-purple-100">
                <BookOpen className="mr-2 h-5 w-5 text-purple-400" />
                Available Exams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-100">{exams.length}</div>
              <p className="text-sm text-purple-300">Exams ready for you to take</p>
            </CardContent>
          </Card>

          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-purple-100">
                <CheckCircle className="mr-2 h-5 w-5 text-purple-400" />
                Completed Exams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-100">0</div>
              <p className="text-sm text-purple-300">Exams you've successfully completed</p>
            </CardContent>
          </Card>

          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-purple-100">
                <Award className="mr-2 h-5 w-5 text-purple-400" />
                Your Rank
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-100">
                {leaderboard.findIndex((entry) => entry.student_id === profile?.id) + 1 || "-"}
              </div>
              <p className="text-sm text-purple-300">Your position on the leaderboard</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
            <Input
              placeholder="Search exams..."
              className="border-purple-800/30 bg-purple-900/30 pl-10 text-purple-100 placeholder:text-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="border-purple-800/30 bg-purple-900/30 text-purple-300 hover:bg-purple-800/50"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="mb-4 text-xl font-semibold text-purple-100">Available Exams</h2>

            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
              </div>
            ) : filteredExams.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredExams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            ) : (
              <Card className="border-purple-800/30 bg-purple-900/30 p-8 text-center">
                <p className="text-purple-300">No exams found matching your search.</p>
              </Card>
            )}
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-purple-100">Leaderboard</h2>
            <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
              <CardContent className="p-4">
                {isLoading ? (
                  <div className="flex justify-center p-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
                  </div>
                ) : leaderboard.length > 0 ? (
                  <div className="space-y-4">
                    {leaderboard.map((entry, index) => (
                      <div
                        key={entry.id}
                        className={`flex items-center justify-between rounded-lg p-2 ${
                          entry.student_id === profile?.id ? "bg-purple-800/30" : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-purple-800/50 text-sm font-bold text-purple-100">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-purple-100">
                              {entry.student?.name || "Unknown"}
                              {entry.student_id === profile?.id && " (You)"}
                            </p>
                            <p className="text-xs text-purple-400">Streak: {entry.streak_days} days</p>
                          </div>
                        </div>
                        <div className="text-lg font-bold text-purple-100">{entry.points}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-purple-300">No leaderboard data available.</p>
                )}
              </CardContent>
              <CardFooter className="border-t border-purple-800/30 p-4">
                <Button
                  variant="outline"
                  className="w-full border-purple-800/30 bg-purple-900/30 text-purple-300 hover:bg-purple-800/50"
                  onClick={() => router.push("/dashboard/student/leaderboard")}
                >
                  View Full Leaderboard
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExamCard({ exam }: { exam: any }) {
  const router = useRouter()

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <Card
      className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md transition-all hover:border-purple-700/50 hover:shadow-lg"
      onClick={() => router.push(`/dashboard/student/exams/${exam.id}`)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-purple-100">{exam.title}</CardTitle>
        <CardDescription className="text-purple-300">{exam.subjects?.name || "General"}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-purple-300">{exam.description || "No description provided."}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-purple-400">
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            <span>{exam.duration} mins</span>
          </div>
          <div className="flex items-center">
            <FileText className="mr-1 h-3 w-3" />
            <span>{exam.total_marks} marks</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-purple-800/30 pt-4">
        <Button
          className="w-full bg-purple-700 hover:bg-purple-600"
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/dashboard/student/exams/${exam.id}`)
          }}
        >
          Start Exam
        </Button>
      </CardFooter>
    </Card>
  )
}
