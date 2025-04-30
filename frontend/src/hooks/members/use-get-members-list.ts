import { User } from "@/features/users/data/schema"
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

interface UserListResponse {
    data: User[]
}

export const useGetMemberList = () => {
    const { data: userData, isLoading } = useQuery<UserListResponse>({
        queryKey: ['userList'],
        queryFn: async () => {
            const response = await api.get('/members/list.php')
            return response.data
        }
    })
    return {
        userData, isLoading
    }
}