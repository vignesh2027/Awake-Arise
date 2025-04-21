"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PlusCircle, Search, Filter, FileText, Users, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useSupabase } from "@/components/supabase-provider"
import { getAllExams } from "@/lib/database"

export default function TeacherDashboard() {
  const router = useRouter()
  const { profile, loading } = useSupabase()
  const { toast } = useToast()
  const [exams, setExams] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Redirect if not a teacher
    if (!loading && profile && profile.role !== "teacher") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the teacher dashboard.",
        variant: "destructive",
      })
      router.push(`/dashboard/${profile.role}`)
    }

    // Fetch exams
    const fetchExams = async () => {
      try {
        const examsData = await getAllExams()
        setExams(examsData)
      } catch (error) {
        console.error("Error fetching exams:", error)
        toast({
          title: "Error",
          description: "Failed to load exams. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (profile && profile.role === "teacher") {
      fetchExams()
    }
  }, [profile, loading, router, toast])

  // Filter exams based on search query
  const filteredExams = exams.filter(
    (exam) =>
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter exams created by the current teacher
  const myExams = filteredExams.filter((exam) => exam.created_by === profile?.id)

  // Filter active exams
  const activeExams = filteredExams.filter((exam) => exam.is_active)

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
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-purple-100">Teacher Dashboard</h1>
            <p className="mt-1 text-purple-300">Manage your exams and monitor student performance</p>
          </div>
          <Button
            className="bg-purple-700 hover:bg-purple-600"
            onClick={() => router.push("/dashboard/teacher/exams/create")}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Exam
          </Button>
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

        <Tabs defaultValue="my-exams" className="space-y-4">
          <TabsList className="bg-purple-900/30">
            <TabsTrigger value="my-exams" className="data-[state=active]:bg-purple-700">
              My Exams
            </TabsTrigger>
            <TabsTrigger value="all-exams" className="data-[state=active]:bg-purple-700">
              All Exams
            </TabsTrigger>
            <TabsTrigger value="active-exams" className="data-[state=active]:bg-purple-700">
              Active Exams
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-exams" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
              </div>
            ) : myExams.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {myExams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            ) : (
              <Card className="border-purple-800/30 bg-purple-900/30 p-8 text-center">
                <p className="text-purple-300">You haven't created any exams yet.</p>
                <Button
                  className="mt-4 bg-purple-700 hover:bg-purple-600"
                  onClick={() => router.push("/dashboard/teacher/exams/create")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Exam
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="all-exams" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
              </div>
            ) : filteredExams.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredExams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            ) : (
              <Card className="border-purple-800/30 bg-purple-900/30 p-8 text-center">
                <p className="text-purple-300">No exams found matching your search.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="active-exams" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
              </div>
            ) : activeExams.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {activeExams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            ) : (
              <Card className="border-purple-800/30 bg-purple-900/30 p-8 text-center">
                <p className="text-purple-300">No active exams found.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-purple-100">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-purple-300">Total Exams</span>
                  <span className="text-lg font-semibold text-purple-100">{myExams.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-300">Active Exams</span>
                  <span className="text-lg font-semibold text-purple-100">
                    {myExams.filter((exam) => exam.is_active).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-300">Total Questions</span>
                  <span className="text-lg font-semibold text-purple-100">-</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-purple-100">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-purple-300">No recent activity to display.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="px-0 text-purple-400">
                View All Activity
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-purple-100">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-purple-800/30 bg-purple-900/30 text-purple-300 hover:bg-purple-800/50"
                  onClick={() => router.push("/dashboard/teacher/exams/create")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Exam
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-purple-800/30 bg-purple-900/30 text-purple-300 hover:bg-purple-800/50"
                  onClick={() => router.push("/dashboard/teacher/questions")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Manage Question Bank
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-purple-800/30 bg-purple-900/30 text-purple-300 hover:bg-purple-800/50"
                  onClick={() => router.push("/dashboard/teacher/students")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  View Student Performance
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-purple-800/30 bg-purple-900/30 text-purple-300 hover:bg-purple-800/50"
                  onClick={() => router.push("/dashboard/teacher/leaderboard")}
                >
                  <Award className="mr-2 h-4 w-4" />
                  View Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
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

  // Get subject icon
  const getSubjectIcon = (icon: string) => {
    return icon || "book"
  }

  return (
    <Card
      className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md transition-all hover:border-purple-700/50 hover:shadow-lg"
      onClick={() => router.push(`/dashboard/teacher/exams/${exam.id}`)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-purple-100">{exam.title}</CardTitle>
            <CardDescription className="text-purple-300">{exam.subjects?.name || "General"}</CardDescription>
          </div>
          <div className={`rounded-full p-2 ${exam.is_active ? "bg-green-900/20" : "bg-red-900/20"}`}>
            <div className={`h-2 w-2 rounded-full ${exam.is_active ? "bg-green-500" : "bg-red-500"}`}></div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-purple-300">{exam.description || "No description provided."}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-purple-400">
          <div className="flex items-center">
            <FileText className="mr-1 h-3 w-3" />
            <span>{exam.duration} mins</span>
          </div>
          <div>
            <span>Created: {formatDate(exam.created_at)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-purple-800/30 pt-4">
        <Button
          className="w-full bg-purple-700 hover:bg-purple-600"
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/dashboard/teacher/exams/${exam.id}`)
          }}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
