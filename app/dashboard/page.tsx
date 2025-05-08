"use client"

import { useAuth } from "@/components/providers/AuthProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-[250px]" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      </div>
    )
  }

  console.log("user", user)

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.firstName || "User"}</CardTitle>
          <CardDescription>This is a protected dashboard page</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            {user?.firstName && (
              <p>
                <strong>First Name:</strong> {user.firstName}
              </p>
            )}
            {user?.lastName && (
              <p>
                <strong>Last Name:</strong> {user.lastName}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
