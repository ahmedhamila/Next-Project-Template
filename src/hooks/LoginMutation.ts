import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useRouter } from 'next/navigation'
import { getTokens, TokenRequest } from '@/services/authService'

export const useLogin = (key: string) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: async (data: TokenRequest) => {
      const response = await getTokens(data)
      return response
    },
    onError: (error: any) => {
      alert("error")
    },
    onSuccess: async (result: any) => {
      alert("Successful Login")
      router.replace(`/dashboard` as any)
      await queryClient.invalidateQueries({ queryKey: [key] })
    }
  })
}
