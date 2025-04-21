"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { useSupabase } from "@/components/supabase-provider"
import { getProfileById } from "@/lib/database"

export default function LoginPage() {
  const router = useRouter()
  const { supabase } = useSupabase()
  const { toast } = useToast()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const validateForm = () => {
    let isValid = true

    // Reset errors
    setEmailError("")
    setPasswordError("")
    setError("")

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required")
      isValid = false
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email address")
        isValid = false
      }
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError("Password is required")
      isValid = false
    }

    return isValid
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Supabase auth error:", error)

        // Handle specific error cases
        if (error.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please check your credentials and try again.")
        } else if (error.message.includes("Email not confirmed")) {
          setError("Please confirm your email address before logging in.")
        } else {
          setError(error.message || "Failed to sign in. Please try again.")
        }

        setIsLoading(false)
        return
      }

      if (data.user) {
        // Check user profile and redirect accordingly
        try {
          const profile = await getProfileById(data.user.id)

          toast({
            title: "Welcome back!",
            description: "You've successfully logged in.",
            duration: 3000,
          })

          if (profile) {
            if (profile.role === "teacher") {
              router.push("/dashboard/teacher")
            } else if (profile.role === "admin") {
              router.push("/dashboard/admin")
            } else {
              router.push("/dashboard/student")
            }
          } else {
            // If no profile exists, redirect to student dashboard by default
            router.push("/dashboard/student")
          }
        } catch (profileError) {
          console.error("Error fetching profile:", profileError)
          setError("Error retrieving user profile. Please try again.")
          setIsLoading(false)
        }
      }
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "Failed to sign in. Please try again.")
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      console.error("Google login error:", error)
      setError(error.message || "Failed to sign in with Google")
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    router.push("/reset-password")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-purple-950 to-black p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-purple-100">AWAKE & ARISE</h1>
          <p className="mt-2 text-purple-300">Sign in to continue your learning journey</p>
        </div>

        <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-purple-100">Sign In</CardTitle>
            <CardDescription className="text-purple-300">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 border-red-500/50 bg-red-900/20 text-red-300">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-purple-200">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`border-purple-800/30 bg-purple-900/30 pl-10 text-purple-100 placeholder:text-purple-500 focus:border-purple-700 focus:ring-purple-700 ${
                      emailError ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {emailError && <p className="text-xs text-red-400">{emailError}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-purple-200">
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs text-purple-400 hover:text-purple-300"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`border-purple-800/30 bg-purple-900/30 pl-10 text-purple-100 placeholder:text-purple-500 focus:border-purple-700 focus:ring-purple-700 ${
                      passwordError ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-purple-400 hover:text-purple-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {passwordError && <p className="text-xs text-red-400">{passwordError}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-700 text-white hover:bg-purple-600"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-4 flex items-center">
              <Separator className="flex-1 bg-purple-800/30" />
              <span className="mx-2 text-xs text-purple-400">OR</span>
              <Separator className="flex-1 bg-purple-800/30" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="mt-4 w-full border-purple-800/30 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-purple-300">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium text-purple-400 hover:text-purple-300">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
