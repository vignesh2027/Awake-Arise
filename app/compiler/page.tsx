"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Copy, Play, Save, AlertCircle, Code, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { useSupabase } from "@/components/supabase-provider"
import { executeCode, getCodeTemplate, getLanguageDisplayName, type SupportedLanguage } from "@/lib/judge0-service"

export default function CodePlaygroundPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { supabase, user } = useSupabase()
  const [language, setLanguage] = useState<SupportedLanguage>("python")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stdin, setStdin] = useState("")
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const [memoryUsed, setMemoryUsed] = useState<number | null>(null)
  const [executionStatus, setExecutionStatus] = useState<string | null>(null)
  const [savedCodes, setSavedCodes] = useState<any[]>([])
  const [isLoadingSaved, setIsLoadingSaved] = useState(false)

  // Set default code on language change
  useEffect(() => {
    setCode(getCodeTemplate(language))
    setOutput("")
    setError(null)
    setExecutionTime(null)
    setMemoryUsed(null)
    setExecutionStatus(null)
  }, [language])

  // Load saved codes if user is logged in
  useEffect(() => {
    if (user) {
      loadSavedCodes()
    }
  }, [user])

  const loadSavedCodes = async () => {
    if (!user) return

    setIsLoadingSaved(true)
    try {
      const { data, error } = await supabase
        .from("saved_code")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10)

      if (error) throw error

      setSavedCodes(data || [])
    } catch (error) {
      console.error("Error loading saved codes:", error)
    } finally {
      setIsLoadingSaved(false)
    }
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput("Running code...")
    setError(null)
    setExecutionTime(null)
    setMemoryUsed(null)
    setExecutionStatus(null)

    try {
      const result = await executeCode({
        language,
        code,
        stdin,
      })

      if (result.error) {
        throw new Error(result.error)
      }

      // Handle the execution result
      let outputText = ""
      let errorText = null

      if (result.stdout) {
        outputText += result.stdout
      }

      if (result.stderr) {
        errorText = result.stderr
      } else if (result.compile_output) {
        errorText = result.compile_output
      } else if (result.message) {
        errorText = result.message
      }

      setOutput(outputText || "Program executed with no output.")
      setError(errorText)
      setExecutionTime(result.time)
      setMemoryUsed(result.memory)
      setExecutionStatus(result.status?.description || null)
    } catch (error: any) {
      console.error("Error running code:", error)
      setError(error.message || "Error executing code. Please try again.")
      setOutput("")
    } finally {
      setIsRunning(false)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)

    toast({
      title: "Code copied",
      description: "The code has been copied to your clipboard",
    })
  }

  const handleSaveCode = async () => {
    if (!user) {
      toast({
        title: "Not signed in",
        description: "Please sign in to save your code",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      // Save code to Supabase
      const { data, error } = await supabase
        .from("saved_code")
        .insert([
          {
            user_id: user.id,
            language,
            code,
            title: `${getLanguageDisplayName(language)} Code - ${new Date().toLocaleDateString()}`,
          },
        ])
        .select()

      if (error) throw error

      toast({
        title: "Code saved",
        description: "Your code has been saved successfully",
      })

      // Refresh saved codes
      loadSavedCodes()
    } catch (error) {
      console.error("Error saving code:", error)
      toast({
        title: "Error saving code",
        description: "There was an error saving your code",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleLoadCode = (savedCode: any) => {
    setLanguage(savedCode.language as SupportedLanguage)
    setCode(savedCode.code)

    toast({
      title: "Code loaded",
      description: "Your saved code has been loaded",
    })
  }

  const handleDownloadCode = () => {
    const extension =
      {
        python: "py",
        java: "java",
        cpp: "cpp",
        javascript: "js",
        typescript: "ts",
        c: "c",
        csharp: "cs",
        php: "php",
        ruby: "rb",
        rust: "rs",
        go: "go",
        kotlin: "kt",
        swift: "swift",
      }[language] || "txt"

    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `code.${extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Code downloaded",
      description: `Your code has been downloaded as code.${extension}`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-purple-100">Code Playground</h1>
            <p className="text-purple-300">Write, run, and test your code with real-time execution</p>
          </div>
          <div className="flex gap-2">
            <Select value={language} onValueChange={(value) => setLanguage(value as SupportedLanguage)}>
              <SelectTrigger className="w-[180px] border-purple-700 bg-purple-900/30 text-purple-200">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent className="border-purple-700 bg-purple-900/90 text-purple-200">
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
                <SelectItem value="swift">Swift</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="border-purple-700 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50"
              onClick={handleCopyCode}
            >
              {isCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="border-purple-700 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50"
              onClick={handleSaveCode}
              disabled={isSaving}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline"
              className="border-purple-700 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50"
              onClick={handleDownloadCode}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-100">Code Editor</CardTitle>
              <CardDescription className="text-purple-300">Write your code here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-[500px] rounded-md border border-purple-800/30 bg-black/50">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="h-full w-full resize-none rounded-md bg-transparent p-4 font-mono text-sm text-purple-100 outline-none"
                  spellCheck="false"
                />
              </div>

              <div className="mt-4">
                <CardTitle className="text-sm text-purple-300 mb-2">Input (Standard Input)</CardTitle>
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  placeholder="Enter input for your program here..."
                  className="w-full h-20 resize-none rounded-md border border-purple-800/30 bg-black/50 p-2 font-mono text-sm text-purple-100"
                  spellCheck="false"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="bg-purple-700 text-white hover:bg-purple-600"
                onClick={handleRunCode}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>Running...</>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Run Code
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-100">Output</CardTitle>
              <CardDescription className="text-purple-300">
                Code execution results
                {executionStatus && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-green-900/50 px-2 py-1 text-xs font-medium text-green-300">
                    {executionStatus}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isRunning ? (
                <div className="h-[500px] rounded-md border border-purple-800/30 bg-black/50 p-4">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-3/4 bg-purple-800/30" />
                    <Skeleton className="h-4 w-1/2 bg-purple-800/30" />
                    <Skeleton className="h-4 w-5/6 bg-purple-800/30" />
                    <Skeleton className="h-4 w-2/3 bg-purple-800/30" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {error && (
                    <Alert variant="destructive" className="border-red-800 bg-red-900/20 text-red-300">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Compilation/Runtime Error</AlertTitle>
                      <AlertDescription>
                        <pre className="mt-2 whitespace-pre-wrap font-mono text-xs">{error}</pre>
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="h-[400px] overflow-auto rounded-md border border-purple-800/30 bg-black/50 p-4 font-mono text-sm text-green-400">
                    {output || "Run your code to see the output here..."}
                  </div>

                  {(executionTime !== null || memoryUsed !== null) && (
                    <div className="flex gap-4 text-xs text-purple-300">
                      {executionTime !== null && (
                        <div>
                          <span className="font-semibold">Execution Time:</span> {executionTime.toFixed(2)}s
                        </div>
                      )}
                      {memoryUsed !== null && (
                        <div>
                          <span className="font-semibold">Memory Used:</span> {(memoryUsed / 1024).toFixed(2)} MB
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                variant="outline"
                className="border-purple-700 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50"
                onClick={() => {
                  setOutput("")
                  setError(null)
                  setExecutionTime(null)
                  setMemoryUsed(null)
                  setExecutionStatus(null)
                }}
                disabled={!output && !error}
              >
                Clear Output
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-purple-100">Saved Code</CardTitle>
              <CardDescription className="text-purple-300">Your previously saved code snippets</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingSaved ? (
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full bg-purple-800/30" />
                  <Skeleton className="h-12 w-full bg-purple-800/30" />
                  <Skeleton className="h-12 w-full bg-purple-800/30" />
                </div>
              ) : savedCodes.length > 0 ? (
                <div className="space-y-2">
                  {savedCodes.map((savedCode) => (
                    <div
                      key={savedCode.id}
                      className="flex items-center justify-between rounded-md border border-purple-800/30 bg-purple-900/50 p-3 hover:bg-purple-800/30 cursor-pointer"
                      onClick={() => handleLoadCode(savedCode)}
                    >
                      <div>
                        <p className="font-medium text-purple-200">{savedCode.title}</p>
                        <p className="text-xs text-purple-400">
                          {getLanguageDisplayName(savedCode.language as SupportedLanguage)} •
                          {new Date(savedCode.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLoadCode(savedCode)
                        }}
                      >
                        <Code className="h-4 w-4 text-purple-400" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Code className="mb-2 h-12 w-12 text-purple-500/50" />
                  <p className="text-purple-300">No saved code snippets yet</p>
                  <p className="text-xs text-purple-400">Write some code and click "Save" to store it for later use</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-purple-800/30 bg-purple-900/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-purple-100">Coding Challenges</CardTitle>
              <CardDescription className="text-purple-300">
                Practice with these coding challenges to improve your skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="easy" className="w-full">
                <TabsList className="bg-purple-900/30 border border-purple-800/30">
                  <TabsTrigger value="easy" className="data-[state=active]:bg-purple-800/50">
                    Easy
                  </TabsTrigger>
                  <TabsTrigger value="medium" className="data-[state=active]:bg-purple-800/50">
                    Medium
                  </TabsTrigger>
                  <TabsTrigger value="hard" className="data-[state=active]:bg-purple-800/50">
                    Hard
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="easy" className="mt-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                      {
                        title: "Fibonacci Sequence",
                        description: "Generate the first n numbers in the Fibonacci sequence",
                        difficulty: "Easy",
                      },
                      {
                        title: "Palindrome Check",
                        description: "Check if a string is a palindrome",
                        difficulty: "Easy",
                      },
                      {
                        title: "FizzBuzz",
                        description:
                          "Print numbers from 1 to n, but for multiples of 3 print 'Fizz' and for multiples of 5 print 'Buzz'",
                        difficulty: "Easy",
                      },
                      {
                        title: "Sum of Digits",
                        description: "Calculate the sum of digits of a number",
                        difficulty: "Easy",
                      },
                    ].map((challenge, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-purple-800/30 bg-purple-900/40 p-4 hover:bg-purple-800/30 transition-colors"
                      >
                        <h3 className="font-medium text-purple-100">{challenge.title}</h3>
                        <p className="mt-1 text-sm text-purple-300">{challenge.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="rounded-full bg-green-900/50 px-2 py-1 text-xs font-medium text-green-300">
                            {challenge.difficulty}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-purple-200 hover:bg-purple-800/50 hover:text-purple-100"
                            onClick={() => {
                              // Load challenge template based on the challenge and language
                              let template = ""
                              if (challenge.title === "Fibonacci Sequence") {
                                if (language === "python") {
                                  template = `# Generate the first n Fibonacci numbers
def fibonacci(n):
    # Write your code here
    pass

# Test the function
n = 10
result = fibonacci(n)
print(f"First {n} Fibonacci numbers: {result}")
`
                                } else if (language === "javascript") {
                                  template = `// Generate the first n Fibonacci numbers
function fibonacci(n) {
    // Write your code here
}

// Test the function
const n = 10;
const result = fibonacci(n);
console.log(\`First \${n} Fibonacci numbers: \${result}\`);
`
                                }
                              }

                              if (template) {
                                setCode(template)
                              }
                            }}
                          >
                            Try Challenge
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="medium" className="mt-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                      {
                        title: "Binary Search",
                        description: "Implement a binary search algorithm",
                        difficulty: "Medium",
                      },
                      {
                        title: "Anagram Checker",
                        description: "Check if two strings are anagrams of each other",
                        difficulty: "Medium",
                      },
                      {
                        title: "Linked List Operations",
                        description: "Implement basic operations on a linked list",
                        difficulty: "Medium",
                      },
                      {
                        title: "Merge Sort",
                        description: "Implement the merge sort algorithm",
                        difficulty: "Medium",
                      },
                    ].map((challenge, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-purple-800/30 bg-purple-900/40 p-4 hover:bg-purple-800/30 transition-colors"
                      >
                        <h3 className="font-medium text-purple-100">{challenge.title}</h3>
                        <p className="mt-1 text-sm text-purple-300">{challenge.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="rounded-full bg-yellow-900/50 px-2 py-1 text-xs font-medium text-yellow-300">
                            {challenge.difficulty}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-purple-200 hover:bg-purple-800/50 hover:text-purple-100"
                          >
                            Try Challenge
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="hard" className="mt-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                      {
                        title: "Dijkstra's Algorithm",
                        description: "Implement Dijkstra's shortest path algorithm",
                        difficulty: "Hard",
                      },
                      {
                        title: "Dynamic Programming",
                        description: "Solve the knapsack problem using dynamic programming",
                        difficulty: "Hard",
                      },
                      {
                        title: "Balanced Binary Tree",
                        description: "Check if a binary tree is balanced",
                        difficulty: "Hard",
                      },
                      {
                        title: "Graph Traversal",
                        description: "Implement BFS and DFS for graph traversal",
                        difficulty: "Hard",
                      },
                    ].map((challenge, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-purple-800/30 bg-purple-900/40 p-4 hover:bg-purple-800/30 transition-colors"
                      >
                        <h3 className="font-medium text-purple-100">{challenge.title}</h3>
                        <p className="mt-1 text-sm text-purple-300">{challenge.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="rounded-full bg-red-900/50 px-2 py-1 text-xs font-medium text-red-300">
                            {challenge.difficulty}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-purple-200 hover:bg-purple-800/50 hover:text-purple-100"
                          >
                            Try Challenge
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
