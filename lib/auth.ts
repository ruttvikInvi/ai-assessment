import { cookies } from "next/headers"
import { jwtDecode } from "jwt-decode"

type TokenPayload = {
  sub: string
  email: string
  exp: number
  iat: number
}

export const getUser = async () => {
  const cookieStore = cookies()
  const accessToken = (await cookieStore).get("accessToken")?.value

  if (!accessToken) {
    return null
  }

  try {
    // Decode the token to get user information
    const payload = jwtDecode<TokenPayload>(accessToken)

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000)
    if (payload.exp < currentTime) {
      return null
    }

    return {
      id: payload.sub,
      email: payload.email,
    }
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

export const isTokenExpired = (token: string) => {
  try {
    const payload = jwtDecode<TokenPayload>(token)
    const currentTime = Math.floor(Date.now() / 1000)
    return payload.exp < currentTime
  } catch (error) {
    return true
  }
}
