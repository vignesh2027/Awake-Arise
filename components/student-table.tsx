import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function StudentTable() {
  // This would be fetched from Supabase in a real implementation
  const students = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.s@example.com",
      avgScore: 92,
      examsCompleted: 12,
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.p@example.com",
      avgScore: 88,
      examsCompleted: 10,
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit.k@example.com",
      avgScore: 85,
      examsCompleted: 11,
      lastActive: "3 hours ago",
    },
    {
      id: 4,
      name: "Sneha Gupta",
      email: "sneha.g@example.com",
      avgScore: 82,
      examsCompleted: 9,
      lastActive: "5 hours ago",
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.s@example.com",
      avgScore: 80,
      examsCompleted: 8,
      lastActive: "2 days ago",
    },
  ]

  return (
    <div className="rounded-md border border-purple-800/30">
      <Table>
        <TableHeader className="bg-purple-900/50">
          <TableRow className="border-purple-800/30 hover:bg-purple-800/20">
            <TableHead className="text-purple-200">Name</TableHead>
            <TableHead className="text-purple-200">Avg. Score</TableHead>
            <TableHead className="text-purple-200 hidden md:table-cell">Exams</TableHead>
            <TableHead className="text-purple-200 hidden md:table-cell">Last Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id} className="border-purple-800/30 hover:bg-purple-800/20">
              <TableCell className="font-medium text-purple-200">
                <div>
                  {student.name}
                  <div className="text-xs text-purple-400">{student.email}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="h-2 w-16 rounded-full bg-purple-800/50">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${student.avgScore}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-purple-200">{student.avgScore}%</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-purple-300">{student.examsCompleted}</TableCell>
              <TableCell className="hidden md:table-cell text-purple-300">{student.lastActive}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
