import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { toast } from '../use-toast'

interface CastVotePayload {
  poll_id: number
  vote_choice: 'yes' | 'no'
}

export function useCastVote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CastVotePayload) => {
      const response = await api.post('/voting/cast-vote.php', payload)
      return response.data
    },
    onSuccess: () => {
      // Invalidate or refetch poll list after casting vote
      queryClient.invalidateQueries({ queryKey: ['pollsList'] })
      toast({
        title: 'Vote submitted successfully',
        description: 'Your vote has been recorded.',
        variant: 'default',
      })
    },
    onError: (error: any) => {
      console.error('Vote submission failed:', error.response?.data || error.message)
      toast({
        title: 'Vote submission failed',
        description: error.response?.data?.message || 'An error occurred while submitting your vote.',
        variant: 'destructive',
      })
    },
  })
}
