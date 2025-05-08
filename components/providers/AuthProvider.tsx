"use client"

import { useAuthCookie } from "@/hooks/useAuthCookie"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type User = {
  id: string
  email: string
  firstName?: string
  lastName?: string
}

type AuthContextType = {
  user: User | null
  login: (accessToken: string, refreshToken: string, userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const { setAuthCookies, getAuthCookies, removeAuthCookies } = useAuthCookie()

  // Login function
  const login = (accessToken: string, refreshToken: string, userData: User) => {
    setAuthCookies({accessToken, refreshToken})
    console.log("userData", userData)
    setUser(userData)
    router.push("/dashboard")
  }

  // Logout function
  const logout = () => {
    removeAuthCookies()
    setUser(null)
    router.push("/login")
  }

  // Check for existing session on mount
  useEffect(() => {
    const { accessToken } = getAuthCookies()
    if (accessToken && !user) {
      logout()
    }
  }, [getAuthCookies, user])

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
