import { api } from "@/lib/api"
import { router } from "@/main"
import { useAuthStore } from "@/stores/authStore"
import { useMutation } from "@tanstack/react-query"

export const useLogout = () => {
    return useMutation({
        mutationFn: async () => {
            const response = await api.post('/logout.php')
            return response.data
        },
        onSuccess: () => {
            useAuthStore.getState().auth.setUser(null)
            router.navigate({ to: '/sign-in' })
        },
    })
}