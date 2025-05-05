import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

interface DashboardResults {
    name: string;
    yes: number;
    no: number;
}

export function useGetResults() {
    return useQuery<DashboardResults[]>({
        queryKey: ['getResults'],
        queryFn: async () => {
            const response = await api.get('/dashboard/poll-results.php')
            return response.data
        },
        refetchInterval: 5000, // Refetch every 10 seconds
        refetchOnWindowFocus: true, // Refetch when window is focused
        refetchOnReconnect: true, // Refetch when the browser reconnects
        refetchOnMount: true, // Refetch when the component mounts
        retry: 1, // Retry once on failure
    })
}
