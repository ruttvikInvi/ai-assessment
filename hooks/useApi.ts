"use client"

import { useCallback } from "react"
import { type AxiosRequestConfig, type AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useAuthCookie } from "./useAuthCookie"
import { useToast } from "@/components/ui/use-toast"
import { useMutation, useQuery, type UseQueryOptions, type UseMutationOptions } from "@tanstack/react-query"
import api from "@/lib/api/axios"

export const useApi = () => {
  const router = useRouter()
  const { getAuthCookies, removeAuthCookies } = useAuthCookie()
  const { toast } = useToast()

  // Handle API errors
  const handleApiError = useCallback(
    (error: AxiosError) => {
      const status = error.response?.status

      // Handle unauthorized errors
      if (status === 401) {
        toast({
          title: "Session expired",
          description: "Please login again to continue",
          variant: "destructive",
        })

        // Clear cookies and redirect to login
        removeAuthCookies()
        router.push("/login")
      }

      // Handle other errors
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })

      throw error
    },
    [removeAuthCookies, router, toast],
  )

  // Create a request function that adds auth header
  const request = useCallback(
    async <T>(config: AxiosRequestConfig): Promise<T> => {
      try {
        const { accessToken } = getAuthCookies()

        if (accessToken) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          }
        }

        const response = await api(config)
        return response.data
      } catch (error) {
        return handleApiError(error as AxiosError)
      }
    },
    [getAuthCookies, handleApiError],
  )

  // Create a query hook with the request function
  const useApiQuery = <T,>(key: string[], config: AxiosRequestConfig, options?: UseQueryOptions<T>) => {
    return useQuery<T>({
      queryKey: key,
      queryFn: () => request<T>(config),
      ...options,
    })
  }

  // Create a mutation hook with the request function
  const useApiMutation = <T, V>(
    config: (data: V) => AxiosRequestConfig,
    options?: UseMutationOptions<T, AxiosError, V>,
  ) => {
    return useMutation<T, AxiosError, V>({
      mutationFn: (data: V) => request<T>(config(data)),
      ...options,
    })
  }

  return {
    request,
    useApiQuery,
    useApiMutation,
  }
}
