import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api"

export const useDeleteMember = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/members/delete.php?id=${id}`)
      return response.data
    },
  })
}
