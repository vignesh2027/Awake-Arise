"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail, AlertCircle, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useSupabase } from "@/components/supabase-provider"

export default function ResetPasswordPage() {
  const router = useRouter()
  const { supabase } = useSupabase()

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [emailError, setEmailError] = useState("")

  const validateForm = () => {
    let isValid = true

    // Reset errors
    setEmailError("")
    setError("")

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address")
      isValid = false
    }

    return isValid
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      })

      if (error) {
        throw error
      }

      setSuccess(true)
    } catch (error: any) {
      console.error("Reset password error:", error)
      setError(error.message || "Failed to send reset password email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-purple-950 to-black p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-purple-100">AWAKE & ARISE</h1>
          <p className="mt-2 text-purple-300">Reset your password</p>
        </div>

        <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-purple-100">Reset Password</CardTitle>
            <CardDescription className="text-purple-300">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 border-red-500/50 bg-red-900/20 text-red-300">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 border-green-500/50 bg-green-900/20 text-green-300">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Password reset link sent! Please check your email inbox and follow the instructions.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
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

              <Button
                type="submit"
                className="w-full bg-purple-700 text-white hover:bg-purple-600"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/login" className="flex items-center text-sm text-purple-400 hover:text-purple-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
