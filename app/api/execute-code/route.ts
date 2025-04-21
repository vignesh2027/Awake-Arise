import { type NextRequest, NextResponse } from "next/server"

const JUDGE0_HOST = "judge0-ce.p.rapidapi.com"
const JUDGE0_API_KEY = "f4178ebf5bmsh6be932702937abap199eb7jsnbc872978e6fa"

// Judge0 language IDs
// See full list at https://ce.judge0.com/languages
const LANGUAGE_IDS = {
  python: 71, // Python 3.8.1
  java: 62, // Java 13.0.1
  cpp: 54, // C++ 17.0.4
  javascript: 93, // Node.js 12.14.0
  typescript: 74, // TypeScript 3.7.4
  c: 50, // C (GCC 9.2.0)
  csharp: 51, // C# (Mono 6.6.0.161)
  php: 68, // PHP 7.4.1
  ruby: 72, // Ruby 2.7.0
  rust: 73, // Rust 1.40.0
  go: 60, // Go 1.13.5
  kotlin: 78, // Kotlin 1.3.70
  swift: 83, // Swift 5.2.3
}

export async function POST(request: NextRequest) {
  try {
    const { language, code, stdin = "" } = await request.json()

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 })
    }

    const languageId = LANGUAGE_IDS[language as keyof typeof LANGUAGE_IDS]
    if (!languageId) {
      return NextResponse.json({ error: `Unsupported language: ${language}` }, { status: 400 })
    }

    // Step 1: Submit code for execution
    const submission = await fetch(`https://${JUDGE0_HOST}/submissions?base64_encoded=true&wait=false`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": JUDGE0_API_KEY,
        "X-RapidAPI-Host": JUDGE0_HOST,
      },
      body: JSON.stringify({
        language_id: languageId,
        source_code: Buffer.from(code).toString("base64"),
        stdin: stdin ? Buffer.from(stdin).toString("base64") : "",
        expected_output: null,
        cpu_time_limit: 5, // seconds
        cpu_extra_time: 1,
        wall_time_limit: 10,
        memory_limit: 128000, // KB
        stack_limit: 64000, // KB
        enable_network: false,
      }),
    })

    if (!submission.ok) {
      const error = await submission.text()
      console.error("Judge0 API error:", error)
      return NextResponse.json({ error: "Failed to submit code for execution" }, { status: submission.status })
    }

    const submissionData = await submission.json()
    const token = submissionData.token

    // Step 2: Poll for results until the execution is complete
    let result
    let attempts = 0
    const maxAttempts = 20 // Prevents infinite polling

    while (attempts < maxAttempts) {
      attempts++
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1s between polls

      const response = await fetch(`https://${JUDGE0_HOST}/submissions/${token}?base64_encoded=true`, {
        headers: {
          "X-RapidAPI-Key": JUDGE0_API_KEY,
          "X-RapidAPI-Host": JUDGE0_HOST,
        },
      })

      if (!response.ok) {
        continue
      }

      result = await response.json()

      // Check if the execution is complete
      if (result.status.id >= 3) {
        // Status 3 or higher means execution is complete
        break
      }
    }

    if (!result) {
      return NextResponse.json({ error: "Execution timed out or failed" }, { status: 500 })
    }

    // Decode base64 outputs
    const stdout = result.stdout ? Buffer.from(result.stdout, "base64").toString() : null
    const stderr = result.stderr ? Buffer.from(result.stderr, "base64").toString() : null
    const compile_output = result.compile_output ? Buffer.from(result.compile_output, "base64").toString() : null
    const message = result.message ? Buffer.from(result.message, "base64").toString() : null

    return NextResponse.json({
      status: result.status,
      stdout,
      stderr,
      compile_output,
      message,
      time: result.time,
      memory: result.memory,
    })
  } catch (error) {
    console.error("Error executing code:", error)
    return NextResponse.json({ error: "Failed to execute code" }, { status: 500 })
  }
}
