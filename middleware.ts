import { type NextRequest, NextResponse } from "next/server"

// Define protected and public routes
const protectedRoutes = ["/dashboard", "/drag-drop", "/infinite-scroll"]
const authRoutes = ["/login", "/register", "/forgot-password"]

export default async function middleware(req: NextRequest) {
  // Get the pathname from the URL
  const path = req.nextUrl.pathname

  // Check if the current route is protected or public
  const isProtectedRoute = protectedRoutes.some((route) => path === route || path.startsWith(`${route}/`))
  const isAuthRoute = authRoutes.includes(path)

  // Get the token from cookies
  const accessToken = req.cookies.get("accessToken")?.value

  // If trying to access a protected route without a token, redirect to login
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // If trying to access auth routes with a token, redirect to dashboard
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
