"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useSupabase } from "@/components/supabase-provider"

export default function UpdatePasswordPage() {
  const router = useRouter()
  const { supabase } = useSupabase()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  useEffect(() => {
    // Check if we have a session when the component mounts
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        // If no session, redirect to login
        router.push("/login")
      }
    }

    checkSession()
  }, [supabase, router])

  const validateForm = () => {
    let isValid = true

    // Reset errors
    setPasswordError("")
    setConfirmPasswordError("")
    setError("")

    // Validate password
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      isValid = false
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match")
      isValid = false
    }

    return isValid
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        throw error
      }

      setSuccess(true)

      // Clear form
      setPassword("")
      setConfirmPassword("")

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error: any) {
      console.error("Update password error:", error)
      setError(error.message || "Failed to update password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-purple-950 to-black p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-purple-100">AWAKE & ARISE</h1>
          <p className="mt-2 text-purple-300">Update your password</p>
        </div>

        <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-purple-100">Create New Password</CardTitle>
            <CardDescription className="text-purple-300">Enter and confirm your new password</CardDescription>
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
                  Password updated successfully! You will be redirected to the login page.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-purple-200">
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
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
                <Label htmlFor="confirmPassword" className="text-purple-200">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={`border-purple-800/30 bg-purple-900/30 pl-10 text-purple-100 placeholder:text-purple-500 focus:border-purple-700 focus:ring-purple-700 ${
                      confirmPasswordError ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-purple-400 hover:text-purple-300"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPasswordError && <p className="text-xs text-red-400">{confirmPasswordError}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-700 text-white hover:bg-purple-600"
                disabled={isLoading || success}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/login" className="text-sm text-purple-400 hover:text-purple-300">
              Back to login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
