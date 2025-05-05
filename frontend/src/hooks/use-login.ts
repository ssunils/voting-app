// hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import { router } from '@/main'


export const useLogin = () => {
    return useMutation({
        mutationFn: async ({ username, password }: { username: string; password: string }) => {
            const response = await api.post('/login.php', { username, password })
            return response.data
        },
        onSuccess: (data) => {

            if (data.success) {
                useAuthStore.getState().auth.setUser({
                    name: data.name,
                    role: data.role,
                    username: data.username,
                });
                if (data.role === 'admin') {
                    router.navigate({ to: '/' });
                }
                if (data.role === 'member') {
                    router.navigate({ to: '/vote' });
                }
            }
        },
    })
}
