import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const useGetPollsList = () => {
    return useQuery({
        queryKey: ['pollsList'],
        queryFn: async () => {
            const response = await api.get('/polls/list.php')
            return response.data
        }
    })  
}