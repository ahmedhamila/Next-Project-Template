import { useState } from "react"
import { useForm } from "react-hook-form"

import { formSchema } from "@/lib/validation/loginSchema"
import { TokenRequest } from "@/services/authService"
import { zodResolver } from "@hookform/resolvers/zod"

import { useLogin } from "@/hooks/LoginMutation"

export function useLoginForm() {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const loginMutation = useLogin("login")

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TokenRequest>({
		resolver: zodResolver(formSchema)
	})

	const onSubmit = (data: TokenRequest) => {
		setErrorMessage(null)
		loginMutation.mutate(data, {
			onError: (error) => {
				setErrorMessage(error.message || "An error occurred during login")
			}
		})
	}

	return {
		register,
		handleSubmit,
		errors,
		errorMessage,
		onSubmit,
		loginMutation
	}
}
