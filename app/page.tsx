'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Please login or register to access the dashboard and explore the app.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => router.push('/login')}
          variant="default"
          className="px-6"
        >
          Login
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <Button
          onClick={() => router.push('/register')}
          variant="outline"
          className="px-6"
        >
          Register
        </Button>
      </div>
    </main>
  )
}
