'use client'

import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { imageService } from '@/lib/api/images'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function InfiniteScrollPage() {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<string[]>({
    queryKey: ['images'],
    queryFn:() => imageService.fetchImages(),
    getNextPageParam: (_, allPages) => allPages.length + 1,
    initialPageParam: 1,
    retry: 1,
  })

  const allImages = data?.pages.flat() || []

  return (
    <main className="p-6 max-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">🐶 Dog Gallery</h1>

      <InfiniteScroll
        dataLength={allImages.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        }
        scrollThreshold={0.9}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allImages.map((img, i) => (
            <Card key={i} className="overflow-hidden">
              <img
                src={img}
                alt={`Dog ${i}`}
                className="w-full h-64 object-cover rounded-md"
              />
            </Card>
          ))}
        </div>
      </InfiniteScroll>

      {isLoading && <p className="text-center mt-4 text-muted-foreground">Loading...</p>}
      {isError && <p className="text-center mt-4 text-destructive">Failed to load images.</p>}
    </main>
  )
}
