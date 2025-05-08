'use client'

import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

export function GlobalLoader() {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  const isLoading = isFetching > 0 || isMutating > 0

  if (!isLoading) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center justify-center p-3 bg-background border rounded-full shadow-lg">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    </div>
  )
}
