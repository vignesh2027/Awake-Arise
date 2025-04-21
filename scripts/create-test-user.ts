import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"

// Replace with your Supabase URL and service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase URL or service role key")
  process.exit(1)
}

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createTestUser() {
  try {
    // Test user details
    const email = "test@example.com"
    const password = "Password123!"
    const name = "Test User"
    const role = "student" // or 'teacher', 'admin'

    console.log(`Creating test user with email: ${email}`)

    // Check if user already exists
    const { data: existingUser } = await supabase.from("profiles").select("*").eq("email", email).single()

    if (existingUser) {
      console.log("User already exists:", existingUser)
      return
    }

    // Create user in Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        name,
        role,
      },
    })

    if (authError) {
      throw authError
    }

    console.log("Auth user created:", authData.user)

    // Create profile in profiles table
    const profileId = uuidv4()
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: profileId,
        auth_id: authData.user.id,
        name,
        email,
        role,
      })
      .select()

    if (profileError) {
      throw profileError
    }

    console.log("Profile created:", profileData)
    console.log("\nTest user created successfully!")
    console.log("Email:", email)
    console.log("Password:", password)
    console.log("Role:", role)
  } catch (error) {
    console.error("Error creating test user:", error)
  }
}

createTestUser()
