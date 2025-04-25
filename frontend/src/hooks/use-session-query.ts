import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

type SessionResponse = {
  authenticated: true
  user_id: number
  name: string
  role: string
}
export const useSessionQuery = () => {
  const {data, isFetching} =  useQuery<SessionResponse>({
    queryKey: ['session'],
    queryFn: async (): Promise<SessionResponse> => {
      const { data } = await api.get('/auth/check_session.php')
      return data
    },
    refetchOnWindowFocus: false,
    retry: false,
  })

  return {
    data,
    isAuthenticated: data?.authenticated,
    isFetching
  }
}
