// lib/api.ts
import { toast } from '@/hooks/use-toast'
import { router } from '@/main'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.PROD ? '/api' : import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // important if using session cookies
})

api.interceptors.response.use(
  (response) => {
    // Return the response if successful
    return response
  },
  (error) => {
    // Handle 401 errors
    if (error.response && error.response.status === 401) {

      toast({
        variant: 'destructive',
        title: 'Session expired!',
      })
      useAuthStore.getState().auth.reset()
      const redirect = `${router.history.location.href}`
      router.navigate({ to: '/sign-in', search: { redirect } })
    }
    // Reject the promise with the error
    return Promise.reject(error)
  }
)
