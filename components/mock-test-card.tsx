"use client"

import { useRouter } from "next/navigation"
import { Clock, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"

interface MockTestCardProps {
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard" | "Mixed"
  questions: number
  duration: number
  id: string
  scheduled?: string
}

export function MockTestCard({
  title,
  description,
  difficulty,
  questions,
  duration,
  id,
  scheduled,
}: MockTestCardProps) {
  const router = useRouter()

  const difficultyColor = {
    Easy: "text-green-400 bg-green-900/30",
    Medium: "text-yellow-400 bg-yellow-900/30",
    Hard: "text-red-400 bg-red-900/30",
    Mixed: "text-blue-400 bg-blue-900/30",
  }

  return (
    <div className="rounded-lg border border-purple-800/30 bg-purple-900/40 p-4 hover:bg-purple-800/30 transition-colors group">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-purple-100 group-hover:text-white transition-colors">{title}</h3>
          <p className="text-sm text-purple-300">{description}</p>
        </div>
        <div className={`rounded-full px-2 py-1 text-xs font-medium ${difficultyColor[difficulty]}`}>{difficulty}</div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-purple-400">
        <div className="flex items-center gap-1">
          <FileText className="h-3 w-3" />
          <span>{questions} questions</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{duration} minutes</span>
        </div>
      </div>
      {scheduled && (
        <div className="mt-2 text-xs text-purple-300">
          <span className="font-medium">Scheduled:</span> {scheduled}
        </div>
      )}
      <div className="mt-4">
        <Button
          onClick={() => router.push(`/mocktest/${id}`)}
          className="w-full bg-purple-700 text-white hover:bg-purple-600"
          size="sm"
        >
          {scheduled ? "View Details" : "Start Test"}
        </Button>
      </div>
    </div>
  )
}
