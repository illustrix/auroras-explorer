import { QueryClient } from '@tanstack/react-query'
import { AppError } from '@/server/common/error'

export const queryClient = new QueryClient()

queryClient.setDefaultOptions({
  queries: {
    retryDelay(failureCount) {
      return Math.min(1000 * 2 ** failureCount, 30000) // Exponential backoff with a max delay of 30 seconds
    },
    retry(failureCount, error) {
      if (error instanceof AppError) {
        // Don't retry if it's a client error (4xx)
        return error.statusCode >= 500
      }
      return failureCount < 3
    },
  },
})
