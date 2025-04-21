import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"
import { getProfileById } from "@/lib/database"
import type { UserRole } from "@/lib/database"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)

    // Get the user's session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session?.user) {
      // Check if the user already has a profile
      const profile = await getProfileById(session.user.id)

      if (!profile) {
        // If no profile exists, create one
        // Try to get the role from user metadata or default to "student"
        const role = (session.user.user_metadata?.role || "student") as UserRole
        const name = session.user.user_metadata?.name || session.user.user_metadata?.full_name || "User"

        // Create profile using the auth user's UUID as the profile ID
        await supabase.from("profiles").insert({
          id: session.user.id,
          name,
          email: session.user.email || "",
          role,
        })

        // Redirect to student dashboard for new users
        return NextResponse.redirect(new URL("/dashboard/student", request.url))
      }

      // For existing users, redirect based on their role
      if (profile.role === "teacher") {
        return NextResponse.redirect(new URL("/dashboard/teacher", request.url))
      } else if (profile.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url))
      } else {
        return NextResponse.redirect(new URL("/dashboard/student", request.url))
      }
    }
  }

  // If no code or session, redirect to login
  return NextResponse.redirect(new URL("/login", request.url))
}
