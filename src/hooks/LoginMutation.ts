import { useRouter } from "next/navigation"

import { getTokens, TokenRequest } from "@/services/authService"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useLogin = (key: string) => {
	const queryClient = useQueryClient()
	const router = useRouter()
	return useMutation({
		mutationFn: async (data: TokenRequest) => {
			const response = await getTokens(data)
			return response
		},
		onError: (error: any) => {
			console.log("error")
		},
		onSuccess: async (result: any) => {
			console.log("Successful Login")
			router.replace(`/dashboard` as any)
			await queryClient.invalidateQueries({ queryKey: [key] })
		}
	})
}
