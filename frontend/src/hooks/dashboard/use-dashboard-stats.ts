import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

interface DashboardStats {
    total_members: number;
    users_online: number;
    pending_polls: number;
    completed_polls: number;
}

export function useDashboardStats() {
    return useQuery<DashboardStats>({
        queryKey: ['dashboardStats'],
        queryFn: async () => {
            const response = await api.get('/dashboard/stats.php')
            return response.data
        },
        refetchInterval: 5000, // Refetch every 10 seconds
        refetchOnWindowFocus: true, // Refetch when window is focused
        refetchOnReconnect: true, // Refetch when the browser reconnects
        refetchOnMount: true, // Refetch when the component mounts
        retry: 1, // Retry once on failure
    })
}
