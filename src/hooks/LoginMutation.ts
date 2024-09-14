import { useRouter } from "next/navigation"

import { getTokens, TokenRequest } from "@/services/authService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useLogin = (key: string) => {
	const queryClient = useQueryClient()
	const router = useRouter()
	return useMutation({
		mutationFn: async (data: TokenRequest) => {
			const response = await getTokens(data)
			return response
		},
		onError: (error: any) => {
			console.log(error)
			toast.error(error?.response?.data.errors[0].detail)
		},
		onSuccess: async (result: any) => {
			toast.success("Login Successful")
			await queryClient.invalidateQueries({ queryKey: [key] })
			router.push(`/dashboard` as any)
		}
	})
}
