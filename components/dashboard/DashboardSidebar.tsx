"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/providers/AuthProvider"
import { Button } from "@/components/ui/button"
import { Home, LogOut, Settings, User } from "lucide-react"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const isActive = (path: string) => {
    console.log("path", {pathname, path})
    return pathname === path
  }

  return user ? (
    <div className="w-48 bg-muted max-h-screen p-4 flex flex-col border-r shrink-0">
      <div className="text-xl font-bold mb-6">My App</div>

      <nav className="space-y-2 flex-1">
        <Link href="/dashboard" passHref>
          <Button variant={isActive("/dashboard") ? "default" : "ghost"} className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>

        <Link href="/drag-drop" passHref>
          <Button variant={isActive("/drag-drop") ? "default" : "ghost"} className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            Drag Drop
          </Button>
        </Link>

        <Link href="/infinite-scroll" passHref>
          <Button variant={isActive("/infinite-scroll") ? "default" : "ghost"} className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Infinite Scroll
          </Button>
        </Link>
      </nav>

      <Button variant="ghost" className="w-full justify-start mt-auto" onClick={logout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  ) : null
}
