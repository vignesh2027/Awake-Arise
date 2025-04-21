import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ExamManagementCard() {
  return (
    <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md h-full">
      <CardHeader>
        <CardTitle className="text-purple-100">Exam Management</CardTitle>
        <CardDescription className="text-purple-300">Create and manage your exams</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md bg-purple-800/20 p-4">
          <h3 className="font-medium text-purple-200">JEE Advanced Mock</h3>
          <p className="text-sm text-purple-300">Physics + Chemistry</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-purple-400">42 questions</span>
            <span className="rounded-full bg-green-900/50 px-2 py-1 text-xs text-green-300">Active</span>
          </div>
        </div>
        <div className="rounded-md bg-purple-800/20 p-4">
          <h3 className="font-medium text-purple-200">NEET Biology</h3>
          <p className="text-sm text-purple-300">Comprehensive Test</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-purple-400">90 questions</span>
            <span className="rounded-full bg-green-900/50 px-2 py-1 text-xs text-green-300">Active</span>
          </div>
        </div>
        <div className="rounded-md bg-purple-800/20 p-4">
          <h3 className="font-medium text-purple-200">Bank PO Mock</h3>
          <p className="text-sm text-purple-300">Reasoning + Quant</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-purple-400">75 questions</span>
            <span className="rounded-full bg-yellow-900/50 px-2 py-1 text-xs text-yellow-300">Draft</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-purple-700 text-white hover:bg-purple-600">
          <Plus className="mr-2 h-4 w-4" />
          Create New Exam
        </Button>
      </CardFooter>
    </Card>
  )
}
