"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, User, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { useSupabase } from "@/components/supabase-provider"
import { getProfileByEmail } from "@/lib/database"
import type { UserRole } from "@/lib/database"

export default function SignupPage() {
  const router = useRouter()
  const { supabase } = useSupabase()
  const { toast } = useToast()

  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("student")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Form validation states
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // Validate form fields
  const validateForm = () => {
    let isValid = true

    // Reset errors
    setNameError("")
    setEmailError("")
    setPasswordError("")
    setError("")

    // Validate name
    if (name.trim().length < 3) {
      setNameError("Name must be at least 3 characters")
      isValid = false
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address")
      isValid = false
    }

    // Validate password
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      isValid = false
    }

    return isValid
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Check if email already exists in profiles
      const existingProfile = await getProfileByEmail(email)
      if (existingProfile) {
        setEmailError("This email is already registered. Please log in instead.")
        setIsLoading(false)
        return
      }

      // Sign up with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      })

      if (signUpError) {
        throw signUpError
      }

      if (data.user) {
        // Create a profile in the profiles table using the auth user's UUID as the ID
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id, // Use the auth user's UUID as the profile ID
          name,
          email,
          role,
        })

        if (profileError) {
          console.error("Error creating profile:", profileError)
          throw new Error("Failed to create user profile. Please try again.")
        }

        // Show success toast
        toast({
          title: "Account created successfully!",
          description: "You can now log in to your account.",
          variant: "success",
          duration: 5000,
        })

        // Sign in the user automatically
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) {
          console.error("Auto sign-in error:", signInError)
          // Redirect to login page if auto sign-in fails
          router.push("/login")
          return
        }

        // Redirect based on role
        if (role === "teacher") {
          router.push("/dashboard/teacher")
        } else if (role === "admin") {
          router.push("/dashboard/admin")
        } else {
          router.push("/dashboard/student")
        }
      }
    } catch (error: any) {
      console.error("Signup error:", error)

      // Handle specific Supabase errors
      if (error.message?.includes("already registered")) {
        setError("This email is already registered. Please log in instead.")
      } else if (error.message?.includes("weak password")) {
        setPasswordError("Password is too weak. Please use a stronger password.")
      } else {
        setError(error.message || "Failed to sign up. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true)

      // Store the selected role in localStorage before redirecting
      localStorage.setItem("signupRole", role)

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      console.error("Google signup error:", error)
      setError(error.message || "Failed to sign up with Google")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-purple-950 to-black p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-purple-100">AWAKE & ARISE</h1>
          <p className="mt-2 text-purple-300">Create an account to start your learning journey</p>
        </div>

        <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-purple-100">Sign Up</CardTitle>
            <CardDescription className="text-purple-300">Enter your details to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 border-red-500/50 bg-red-900/20 text-red-300">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-purple-200">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={`border-purple-800/30 bg-purple-900/30 pl-10 text-purple-100 placeholder:text-purple-500 focus:border-purple-700 focus:ring-purple-700 ${
                      nameError ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {nameError && <p className="text-xs text-red-400">{nameError}</p>}
              </div>

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
                <Label htmlFor="password" className="text-purple-200">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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
                {passwordError ? (
                  <p className="text-xs text-red-400">{passwordError}</p>
                ) : (
                  <p className="text-xs text-purple-400">Password must be at least 8 characters long</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-purple-200">I am a</Label>
                <RadioGroup
                  value={role}
                  onValueChange={(value) => setRole(value as UserRole)}
                  className="flex space-x-4"
                  defaultValue="student"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="student"
                      id="student"
                      className="border-purple-700 text-purple-300 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                    />
                    <Label htmlFor="student" className="text-purple-200">
                      Student
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="teacher"
                      id="teacher"
                      className="border-purple-700 text-purple-300 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                    />
                    <Label htmlFor="teacher" className="text-purple-200">
                      Teacher
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="admin"
                      id="admin"
                      className="border-purple-700 text-purple-300 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                    />
                    <Label htmlFor="admin" className="text-purple-200">
                      Admin
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-700 text-white hover:bg-purple-600"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
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
              onClick={handleGoogleSignup}
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
              Sign up with Google
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-purple-300">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-purple-400 hover:text-purple-300">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
