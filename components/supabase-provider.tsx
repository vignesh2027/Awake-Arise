"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { supabase } from "@/lib/database"
import type { Profile, UserRole } from "@/lib/database"
import { getProfileById } from "@/lib/database"

// Create a context for the Supabase client
const SupabaseContext = createContext<{
  supabase: typeof supabase
  user: any
  profile: Profile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}>({
  supabase,
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
})

// Export the provider
export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Function to refresh the profile
  const refreshProfile = async () => {
    if (!user) {
      setProfile(null)
      return
    }

    try {
      const profile = await getProfileById(user.id)
      setProfile(profile)
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  // Function to sign out
  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  useEffect(() => {
    // Check for active session
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
          setLoading(false)
          return
        }

        if (data.session) {
          setUser(data.session.user)

          // Get or create profile
          try {
            const profile = await getProfileById(data.session.user.id)

            if (profile) {
              setProfile(profile)
            } else {
              // Create a new profile if it doesn't exist
              console.log("Creating new profile for user:", data.session.user.id)
              const newProfile = {
                id: data.session.user.id, // Use the auth user's UUID as the profile ID
                name: data.session.user.user_metadata?.name || data.session.user.user_metadata?.full_name || "User",
                email: data.session.user.email || "",
                role: (data.session.user.user_metadata?.role || "student") as UserRole,
                avatar_url: data.session.user.user_metadata?.avatar_url,
              }

              try {
                const { error: insertError } = await supabase.from("profiles").insert([newProfile])

                if (insertError) {
                  console.error("Error creating profile:", insertError)
                } else {
                  setProfile(newProfile)
                }
              } catch (insertError) {
                console.error("Exception creating profile:", insertError)
              }
            }
          } catch (profileError) {
            console.error("Error fetching/creating profile:", profileError)
          }
        }

        setLoading(false)
      } catch (error) {
        console.error("Error in checkSession:", error)
        setLoading(false)
      }
    }

    checkSession()

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event)

      if (session) {
        setUser(session.user)

        // Get or create profile
        try {
          const profile = await getProfileById(session.user.id)

          if (profile) {
            setProfile(profile)
          } else {
            // Create a new profile if it doesn't exist
            console.log("Creating new profile for user on auth change:", session.user.id)
            const newProfile = {
              id: session.user.id, // Use the auth user's UUID as the profile ID
              name: session.user.user_metadata?.name || session.user.user_metadata?.full_name || "User",
              email: session.user.email || "",
              role: (session.user.user_metadata?.role || "student") as UserRole,
              avatar_url: session.user.user_metadata?.avatar_url,
            }

            try {
              const { error: insertError } = await supabase.from("profiles").insert([newProfile])

              if (insertError) {
                console.error("Error creating profile on auth change:", insertError)
              } else {
                setProfile(newProfile)
              }
            } catch (insertError) {
              console.error("Exception creating profile on auth change:", insertError)
            }
          }
        } catch (profileError) {
          console.error("Error fetching/creating profile on auth change:", profileError)
        }
      } else {
        setUser(null)
        setProfile(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])

  return (
    <SupabaseContext.Provider value={{ supabase, user, profile, loading, signOut, refreshProfile }}>
      {children}
    </SupabaseContext.Provider>
  )
}

// Export a hook to use the Supabase client
export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }
  return context
}
