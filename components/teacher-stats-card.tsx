import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface TeacherStatsCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: LucideIcon
  description: string
}

export function TeacherStatsCard({ title, value, change, trend, icon: Icon, description }: TeacherStatsCardProps) {
  return (
    <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-300">{title}</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-bold text-purple-100">{value}</h3>
              <p
                className={`text-xs font-medium ${
                  trend === "up" ? "text-green-400" : trend === "down" ? "text-red-400" : "text-purple-300"
                }`}
              >
                {change}
              </p>
            </div>
          </div>
          <div className="rounded-full bg-purple-800/50 p-2">
            <Icon className="h-5 w-5 text-purple-200" />
          </div>
        </div>
        <p className="mt-2 text-xs text-purple-400">{description}</p>
      </CardContent>
    </Card>
  )
}
