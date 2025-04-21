"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Users, BookOpen, Award, User, FileText, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useSupabase } from "@/components/supabase-provider"

export default function AdminDashboard() {
  const router = useRouter()
  const { profile, loading } = useSupabase()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect if not an admin
    if (!loading && profile && profile.role !== "admin") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive",
      })
      router.push(`/dashboard/${profile.role}`)
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [profile, loading, router, toast])

  if (loading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-purple-950 to-black">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
          <p className="text-lg text-purple-300">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-100">Admin Dashboard</h1>
          <p className="mt-1 text-purple-300">Manage users, exams, and platform settings</p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardContent className="flex items-center p-4">
              <Users className="mr-3 h-8 w-8 text-purple-400" />
              <div>
                <p className="text-sm text-purple-300">Total Users</p>
                <p className="text-xl font-bold text-purple-100">9</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardContent className="flex items-center p-4">
              <BookOpen className="mr-3 h-8 w-8 text-purple-400" />
              <div>
                <p className="text-sm text-purple-300">Total Exams</p>
                <p className="text-xl font-bold text-purple-100">5</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardContent className="flex items-center p-4">
              <FileText className="mr-3 h-8 w-8 text-purple-400" />
              <div>
                <p className="text-sm text-purple-300">Total Questions</p>
                <p className="text-xl font-bold text-purple-100">10</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardContent className="flex items-center p-4">
              <Award className="mr-3 h-8 w-8 text-purple-400" />
              <div>
                <p className="text-sm text-purple-300">Achievements</p>
                <p className="text-xl font-bold text-purple-100">5</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-purple-100">User Management</CardTitle>
              <CardDescription className="text-purple-300">Manage users and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-purple-900/50 p-4">
                  <div className="flex items-center">
                    <User className="mr-3 h-6 w-6 text-purple-400" />
                    <div>
                      <p className="font-medium text-purple-100">Students</p>
                      <p className="text-sm text-purple-300">5 users</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-purple-800/30 bg-purple-900/30 text-purple-300 hover:bg-purple-800/50"
                    onClick={() => router.push("/dashboard/admin/users/students")}
                  >
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-purple-900/50 p-4">
                  <div className="flex items-center">
                    <User className="mr-3 h-6 w-6 text-purple-400" />
                    <div>
                      <p className="font-medium text-purple-100">Teachers</p>
                      <p className="text-sm text-purple-300">3 users</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-purple-800/30 bg-purple-900/30 text-purple-300 hover:bg-purple-800/50"
                    onClick={() => router.push("/dashboard/admin/users/teachers")}
                  >
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-purple-900/50 p-4">
                  <div className="flex items-center">
                    <User className="mr-3 h-6 w-6 text-purple-400" />
                    <div>
                      <p className="font-medium text-purple-100">Admins</p>
                      <p className="text-sm text-purple-300">1 user</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-purple-800/30 bg-purple-900/30 text-purple-300 hover:bg-purple-800/50"
                    onClick={() => router.push("/dashboard/admin/users/admins")}
                  >
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-purple-700 hover:bg-purple-600"
                onClick={() => router.push("/dashboard/admin/users")}
              >
                View All Users
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-purple-100">Platform Management</CardTitle>
              <CardDescription className="text-purple-300">Manage exams, subjects, and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-purple-900/50 p-4">
                  <div className="flex items-center">
                    <BookOpen className="mr-3 h-6 w-6 text-purple-400" />
                    <div>
                      <p className="font-medium text-purple-100">Exams</p>
                      <p className="text-sm text-purple-300">Manage all exams</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-purple-800/30 bg-purple-900/30 text-purple-300 hover:bg-purple-800/50"
                    onClick={() => router.push("/dashboard/admin/exams")}
                  >
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-purple-900/50 p-4">
                  <div className="flex items-center">
                    <FileText className="mr-3 h-6 w-6 text-purple-400" />
                    <div>
                      <p className="font-medium text-purple-100">Subjects</p>
                      <p className="text-sm text-purple-300">Manage subject categories</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-purple-800/30 bg-purple-900/30 text-purple-300 hover:bg-purple-800/50"
                    onClick={() => router.push("/dashboard/admin/subjects")}
                  >
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-purple-900/50 p-4">
                  <div className="flex items-center">
                    <Award className="mr-3 h-6 w-6 text-purple-400" />
                    <div>
                      <p className="font-medium text-purple-100">Achievements</p>
                      <p className="text-sm text-purple-300">Manage achievement system</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-purple-800/30 bg-purple-900/30 text-purple-300 hover:bg-purple-800/50"
                    onClick={() => router.push("/dashboard/admin/achievements")}
                  >
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-purple-700 hover:bg-purple-600"
                onClick={() => router.push("/dashboard/admin/settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Platform Settings
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
