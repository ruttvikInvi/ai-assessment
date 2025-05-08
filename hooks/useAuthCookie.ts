"use client"

import { useCallback } from "react"
import Cookies from "js-cookie"

type AuthTokens = {
  accessToken: string
  refreshToken: string
}

export const useAuthCookie = () => {
  // Cookie options
  const cookieOptions = {
    expires: 7, // 7 days
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  }

  // Set auth cookies
  const setAuthCookies = useCallback((tokens: AuthTokens) => {
    Cookies.set("accessToken", tokens.accessToken, cookieOptions)
    Cookies.set("refreshToken", tokens.refreshToken, cookieOptions)
  }, [])

  // Get auth cookies
  const getAuthCookies = useCallback(() => {
    return {
      accessToken: Cookies.get("accessToken"),
      refreshToken: Cookies.get("refreshToken"),
    }
  }, [])

  // Remove auth cookies
  const removeAuthCookies = useCallback(() => {
    Cookies.remove("accessToken", { path: "/" })
    Cookies.remove("refreshToken", { path: "/" })
  }, [])

  return {
    setAuthCookies,
    getAuthCookies,
    removeAuthCookies,
  }
}
