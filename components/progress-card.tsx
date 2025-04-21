import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressCardProps {
  title: string
  progress: number
  icon: LucideIcon
  description: string
  daysLeft: number
}

export function ProgressCard({ title, progress, icon: Icon, description, daysLeft }: ProgressCardProps) {
  return (
    <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-purple-100">{title}</h3>
            <p className="text-sm text-purple-300">{description}</p>
          </div>
          <div className="rounded-full bg-purple-800/50 p-2">
            <Icon className="h-5 w-5 text-purple-200" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm text-purple-300">Progress</div>
            <div className="text-sm font-medium text-purple-200">{progress}%</div>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-purple-800/30"
            indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
          />
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-purple-400">{daysLeft} days left</div>
            <div className="text-xs text-purple-400">Target: 100%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
