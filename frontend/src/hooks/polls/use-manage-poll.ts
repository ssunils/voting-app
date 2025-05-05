import { api } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"

export const useCreatePoll = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = api.post('/polls/create.php', data)
            return response
        }
    })
}

export const useUpdatePoll = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = api.post('/polls/update.php', data)
            return response
        }
    })
}

export const useDeletePoll = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = api.post('/polls/delete.php', data)
            return response
        }
    })
}

export const useActivatePoll = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = api.post('/polls/activate.php', data)
            return response
        }
    })
}


export const useDeActivatePoll = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = api.post('/polls/deactivate.php', data)
            return response
        }
    })
}