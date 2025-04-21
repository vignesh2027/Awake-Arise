"use client"

import { useRouter } from "next/navigation"
import { CheckCircle, ChevronRight, Download, Home, RefreshCcw, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Mock results data - in a real app, this would be fetched from Supabase
  const results = {
    id: params.id,
    title: "JEE Physics Mock Test",
    score: 80,
    totalQuestions: 5,
    correctAnswers: 4,
    incorrectAnswers: 1,
    skippedAnswers: 0,
    timeTaken: "45:30",
    date: "May 5, 2023",
    feedback: "Great job! You've shown a strong understanding of mechanics concepts.",
    questionAnalysis: [
      {
        id: 1,
        text: "A body is thrown vertically upward with an initial velocity of 19.6 m/s. The maximum height reached by the body is: (Take g = 9.8 m/s²)",
        correctAnswer: "b",
        userAnswer: "b",
        isCorrect: true,
        explanation:
          "The maximum height is given by h = v²/2g, where v is the initial velocity. h = (19.6)²/(2×9.8) = 19.6 m.",
      },
      {
        id: 2,
        text: "A particle moves in a straight line with a constant acceleration. If the particle starts from rest, the ratio of the distance covered in the nth second to the distance covered in the first n seconds is:",
        correctAnswer: "a",
        userAnswer: "a",
        isCorrect: true,
        explanation:
          "Distance in nth second = u + a/2(2n-1) = a/2(2n-1). Total distance in n seconds = an²/2. Ratio = (2n-1):n²",
      },
      {
        id: 3,
        text: "The work done by all forces on a body equals the change in its:",
        correctAnswer: "b",
        userAnswer: "b",
        isCorrect: true,
        explanation:
          "According to the work-energy theorem, the work done by all forces on a body equals the change in its kinetic energy.",
      },
      {
        id: 4,
        text: "The SI unit of pressure is:",
        correctAnswer: "b",
        userAnswer: "b",
        isCorrect: true,
        explanation: "The SI unit of pressure is Pascal (Pa), which is equal to N/m².",
      },
      {
        id: 5,
        text: "Which of the following is an example of a perfectly inelastic collision?",
        correctAnswer: "c",
        userAnswer: "d",
        isCorrect: false,
        explanation:
          "In a perfectly inelastic collision, the objects stick together after collision. A bullet embedding itself in a block of wood is an example of this.",
      },
    ],
    improvementAreas: ["Inelastic collisions", "Conservation of momentum"],
    strengths: ["Kinematics", "Work-energy theorem", "Units and dimensions"],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="outline"
            className="border-purple-700 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50"
            onClick={() => router.push("/dashboard/student")}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-purple-700 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Results
            </Button>
            <Button
              className="bg-purple-700 text-white hover:bg-purple-600"
              onClick={() => router.push(`/mocktest/${params.id}`)}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Retake Test
            </Button>
          </div>
        </div>

        <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md mb-6">
          <CardHeader>
            <CardTitle className="text-purple-100">Test Results: {results.title}</CardTitle>
            <CardDescription className="text-purple-300">
              Completed on {results.date} • Time taken: {results.timeTaken}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-8 border-purple-800/30">
                <svg className="absolute h-full w-full" viewBox="0 0 100 100">
                  <circle className="stroke-purple-800/30" cx="50" cy="50" r="40" strokeWidth="8" fill="none" />
                  <circle
                    className="stroke-purple-500"
                    cx="50"
                    cy="50"
                    r="40"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * results.score) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-100">{results.score}%</div>
                  <div className="text-sm text-purple-300">Score</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-lg font-medium text-purple-100">
                  {results.correctAnswers} out of {results.totalQuestions} correct
                </p>
                <p className="text-sm text-purple-300">
                  {results.incorrectAnswers} incorrect • {results.skippedAnswers} skipped
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-purple-800/20 p-4">
              <h3 className="mb-2 font-medium text-purple-100">Feedback</h3>
              <p className="text-purple-300">{results.feedback}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-purple-800/20 p-4">
                <h3 className="mb-2 font-medium text-purple-100">Strengths</h3>
                <ul className="space-y-1 text-purple-300">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg bg-purple-800/20 p-4">
                <h3 className="mb-2 font-medium text-purple-100">Areas for Improvement</h3>
                <ul className="space-y-1 text-purple-300">
                  {results.improvementAreas.map((area, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-400" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-purple-100">Question Analysis</CardTitle>
            <CardDescription className="text-purple-300">
              Review your answers and learn from your mistakes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.questionAnalysis.map((question, index) => (
              <div
                key={index}
                className={`rounded-lg border p-4 ${
                  question.isCorrect ? "border-green-500/30 bg-green-900/10" : "border-red-500/30 bg-red-900/10"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                          question.isCorrect ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <h3 className={`font-medium ${question.isCorrect ? "text-green-300" : "text-red-300"}`}>
                        {question.isCorrect ? "Correct" : "Incorrect"}
                      </h3>
                    </div>
                    <p className="mt-2 text-purple-200">{question.text}</p>
                    <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                      <div
                        className={`rounded border border-green-500/30 bg-green-900/10 p-2 text-sm ${
                          question.userAnswer === question.correctAnswer ? "text-green-300" : "text-green-200"
                        }`}
                      >
                        <span className="font-medium">Correct Answer:</span> Option{" "}
                        {question.correctAnswer.toUpperCase()}
                      </div>
                      {question.userAnswer && (
                        <div
                          className={`rounded border p-2 text-sm ${
                            question.isCorrect
                              ? "border-green-500/30 bg-green-900/10 text-green-300"
                              : "border-red-500/30 bg-red-900/10 text-red-300"
                          }`}
                        >
                          <span className="font-medium">Your Answer:</span> Option {question.userAnswer.toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="mt-3 rounded bg-purple-800/20 p-3 text-sm text-purple-300">
                      <span className="font-medium text-purple-200">Explanation:</span> {question.explanation}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-center border-t border-purple-800/30 pt-4">
            <Button
              className="bg-purple-700 text-white hover:bg-purple-600"
              onClick={() => router.push("/mocktest/list")}
            >
              Try Another Test
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
