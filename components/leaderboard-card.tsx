import { Trophy } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function LeaderboardCard() {
  // This would be fetched from Supabase in a real implementation
  const leaderboard = [
    {
      id: 1,
      name: "Rahul Sharma",
      score: 920,
      rank: 1,
    },
    {
      id: 2,
      name: "Priya Patel",
      score: 880,
      rank: 2,
    },
    {
      id: 3,
      name: "Amit Kumar",
      score: 850,
      rank: 3,
    },
    {
      id: 4,
      name: "Sneha Gupta",
      score: 820,
      rank: 4,
    },
    {
      id: 5,
      name: "Vikram Singh",
      score: 800,
      rank: 5,
    },
  ]

  return (
    <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md h-full">
      <CardHeader>
        <CardTitle className="text-purple-100">Leaderboard</CardTitle>
        <CardDescription className="text-purple-300">Top performers this month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {leaderboard.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between rounded-md bg-purple-800/20 p-3 hover:bg-purple-800/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  student.rank === 1
                    ? "bg-yellow-500/20 text-yellow-300"
                    : student.rank === 2
                      ? "bg-gray-400/20 text-gray-300"
                      : student.rank === 3
                        ? "bg-amber-600/20 text-amber-400"
                        : "bg-purple-800/50 text-purple-300"
                }`}
              >
                {student.rank}
              </div>
              <div className="text-sm font-medium text-purple-200">{student.name}</div>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="h-3 w-3 text-purple-400" />
              <span className="text-sm font-medium text-purple-200">{student.score}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
