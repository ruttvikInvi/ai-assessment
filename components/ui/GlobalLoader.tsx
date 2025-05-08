'use client'

import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

export function GlobalLoader() {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  const isLoading = isFetching > 0 || isMutating > 0

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50">
      <div className="flex items-center justify-center p-3 bg-background/80 border rounded-full shadow-lg backdrop-blur-sm">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    </div>
  )
}
