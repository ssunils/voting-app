import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export interface LatestVotesResponse {
    total: number;
    votes: [
        {
            member_name: string;
            poll_title: string;
            vote_choice: string;
            created_at: string;
        }
    ]
}

export function useGetLatestVotes() {
    return useQuery<LatestVotesResponse>({
        queryKey: ['latestVotes'],
        queryFn: async () => {
            const response = await api.get('/dashboard/latest-votes.php')
            return response.data
        },
        refetchInterval: 5000, // Refetch every 10 seconds
        refetchOnWindowFocus: true, // Refetch when window is focused
        refetchOnReconnect: true, // Refetch when the browser reconnects
        refetchOnMount: true, // Refetch when the component mounts
        retry: 1, // Retry once on failure
    })
}
