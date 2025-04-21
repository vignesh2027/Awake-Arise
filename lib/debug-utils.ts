// Debug utility functions for authentication and database operations

/**
 * Logs authentication-related information for debugging
 * @param message Debug message
 * @param data Optional data to log
 */
export function logAuth(message: string, data?: any) {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Auth Debug] ${message}`, data ? data : "")
  }
}

/**
 * Logs database-related information for debugging
 * @param message Debug message
 * @param data Optional data to log
 */
export function logDB(message: string, data?: any) {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[DB Debug] ${message}`, data ? data : "")
  }
}

/**
 * Logs error information for debugging
 * @param message Error message
 * @param error Error object
 */
export function logError(message: string, error: any) {
  console.error(`[Error] ${message}`, error)

  // Log additional details if available
  if (error?.code) {
    console.error(`Error code: ${error.code}`)
  }

  if (error?.details) {
    console.error(`Error details: ${error.details}`)
  }
}

/**
 * Formats an error message for display to users
 * @param error Error object or message
 * @returns Formatted error message
 */
export function formatErrorMessage(error: any): string {
  if (!error) return "An unknown error occurred"

  if (typeof error === "string") return error

  // Handle Supabase auth errors
  if (error.message?.includes("Invalid login credentials")) {
    return "Invalid email or password. Please check your credentials and try again."
  }

  if (error.message?.includes("Email not confirmed")) {
    return "Please confirm your email address before logging in."
  }

  // Return the error message or a generic one
  return error.message || "An error occurred. Please try again."
}
