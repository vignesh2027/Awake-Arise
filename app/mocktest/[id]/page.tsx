"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Clock, Flag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function MockTestPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false)
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([])

  // Mock test data - in a real app, this would be fetched from Supabase
  const mockTest = {
    id: params.id,
    title: "JEE Physics Mock Test",
    description: "Test your knowledge of mechanics and thermodynamics",
    duration: 60, // minutes
    questions: [
      {
        id: 1,
        text: "A body is thrown vertically upward with an initial velocity of 19.6 m/s. The maximum height reached by the body is: (Take g = 9.8 m/s²)",
        options: [
          { id: "a", text: "19.6 m" },
          { id: "b", text: "39.2 m" },
          { id: "c", text: "9.8 m" },
          { id: "d", text: "19.6² m" },
        ],
      },
      {
        id: 2,
        text: "A particle moves in a straight line with a constant acceleration. If the particle starts from rest, the ratio of the distance covered in the nth second to the distance covered in the first n seconds is:",
        options: [
          { id: "a", text: "(2n-1) : n²" },
          { id: "b", text: "n : (2n-1)" },
          { id: "c", text: "n² : (2n-1)" },
          { id: "d", text: "(2n-1) : n" },
        ],
      },
      {
        id: 3,
        text: "The work done by all forces on a body equals the change in its:",
        options: [
          { id: "a", text: "Potential energy" },
          { id: "b", text: "Kinetic energy" },
          { id: "c", text: "Momentum" },
          { id: "d", text: "Angular momentum" },
        ],
      },
      {
        id: 4,
        text: "The SI unit of pressure is:",
        options: [
          { id: "a", text: "Newton" },
          { id: "b", text: "Pascal" },
          { id: "c", text: "Joule" },
          { id: "d", text: "Watt" },
        ],
      },
      {
        id: 5,
        text: "Which of the following is an example of a perfectly inelastic collision?",
        options: [
          { id: "a", text: "A rubber ball bouncing off a wall" },
          { id: "b", text: "Two billiard balls colliding" },
          { id: "c", text: "A bullet embedding itself in a block of wood" },
          { id: "d", text: "Two glass marbles colliding and breaking" },
        ],
      },
    ],
  }

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Auto-submit when time is up
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < mockTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleFlagQuestion = () => {
    if (flaggedQuestions.includes(currentQuestion)) {
      setFlaggedQuestions(flaggedQuestions.filter((q) => q !== currentQuestion))
    } else {
      setFlaggedQuestions([...flaggedQuestions, currentQuestion])
    }
  }

  const handleSubmitTest = () => {
    // In a real app, this would send the answers to Supabase
    console.log("Submitting answers:", answers)
    router.push(`/results/${mockTest.id}`)
  }

  const question = mockTest.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / mockTest.questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="outline"
            className="border-purple-700 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50"
            onClick={() => setIsExitDialogOpen(true)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Exit Test
          </Button>
          <div className="flex items-center gap-2 rounded-full bg-purple-900/50 px-4 py-2 text-purple-100">
            <Clock className="h-4 w-4 text-purple-300" />
            <span className="font-mono text-sm font-medium">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-purple-100">{mockTest.title}</CardTitle>
                <CardDescription className="text-purple-300">{mockTest.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-purple-300">
                  Question {currentQuestion + 1} of {mockTest.questions.length}
                </span>
              </div>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-purple-800/30"
              indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-purple-800/20 p-4">
              <div className="flex items-start justify-between">
                <div className="text-lg font-medium text-purple-100">{question.text}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`ml-2 h-8 w-8 shrink-0 rounded-full ${
                    flaggedQuestions.includes(currentQuestion)
                      ? "bg-yellow-900/50 text-yellow-300 hover:bg-yellow-900/70 hover:text-yellow-200"
                      : "bg-purple-800/30 text-purple-300 hover:bg-purple-800/50 hover:text-purple-200"
                  }`}
                  onClick={handleFlagQuestion}
                >
                  <Flag className="h-4 w-4" />
                  <span className="sr-only">Flag question</span>
                </Button>
              </div>
            </div>

            <RadioGroup value={answers[currentQuestion] || ""} onValueChange={handleAnswerChange} className="space-y-3">
              {question.options.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center rounded-lg border border-purple-800/30 p-4 transition-colors ${
                    answers[currentQuestion] === option.id
                      ? "border-purple-500 bg-purple-800/30"
                      : "hover:bg-purple-800/20"
                  }`}
                >
                  <RadioGroupItem
                    value={option.id}
                    id={`option-${option.id}`}
                    className="border-purple-700 text-purple-300 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                  />
                  <Label htmlFor={`option-${option.id}`} className="ml-3 flex-1 cursor-pointer text-purple-200">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t border-purple-800/30 pt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-purple-700 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50"
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                className="border-purple-700 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50"
                onClick={handleNextQuestion}
                disabled={currentQuestion === mockTest.questions.length - 1}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <Button
              className="bg-purple-700 text-white hover:bg-purple-600"
              onClick={() => setIsSubmitDialogOpen(true)}
            >
              Submit Test
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-6">
          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {mockTest.questions.map((_, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className={`h-10 w-10 ${
                      index === currentQuestion
                        ? "border-purple-500 bg-purple-800/50 text-purple-100"
                        : answers[index]
                          ? "border-green-500/50 bg-green-900/20 text-green-300 hover:bg-green-900/30"
                          : flaggedQuestions.includes(index)
                            ? "border-yellow-500/50 bg-yellow-900/20 text-yellow-300 hover:bg-yellow-900/30"
                            : "border-purple-800/30 bg-purple-900/30 text-purple-300 hover:bg-purple-800/30"
                    }`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-purple-300">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full border border-green-500/50 bg-green-900/20"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full border border-yellow-500/50 bg-yellow-900/20"></div>
                    <span>Flagged</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full border border-purple-800/30 bg-purple-900/30"></div>
                    <span>Unanswered</span>
                  </div>
                </div>
                <div>
                  <span className="font-medium">{Object.keys(answers).length}</span> of {mockTest.questions.length}{" "}
                  answered
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Submit Test Dialog */}
      <AlertDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <AlertDialogContent className="border-purple-800/30 bg-purple-900/90 backdrop-blur-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-purple-100">Submit Test?</AlertDialogTitle>
            <AlertDialogDescription className="text-purple-300">
              You have answered {Object.keys(answers).length} out of {mockTest.questions.length} questions. Are you sure
              you want to submit your test?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-purple-700 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-purple-700 text-white hover:bg-purple-600" onClick={handleSubmitTest}>
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Exit Test Dialog */}
      <AlertDialog open={isExitDialogOpen} onOpenChange={setIsExitDialogOpen}>
        <AlertDialogContent className="border-purple-800/30 bg-purple-900/90 backdrop-blur-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-purple-100">Exit Test?</AlertDialogTitle>
            <AlertDialogDescription className="text-purple-300">
              Your progress will be lost if you exit now. Are you sure you want to exit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-purple-700 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-purple-700 text-white hover:bg-purple-600"
              onClick={() => router.push("/dashboard/student")}
            >
              Exit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
