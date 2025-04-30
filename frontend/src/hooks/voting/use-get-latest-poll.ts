import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export function useLatestPoll() {
  return useQuery({
    queryKey: ['pollsList'],
    queryFn: async () => {
        const response = await api.get('/voting/active.php')
        return response.data
    },
    staleTime: 3000, // 1 minute (adjust based on freshness needs)
    refetchInterval: 3000, // 5 seconds (adjust based on polling needs)
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: true, //  refetch on reconnect
    retry: 1, // Retry once if API fails
})  
}
