"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useLoginForm } from "@/hooks/useLoginForm"

export default function Login() {
	const {
		register,
		handleSubmit,
		errors,
		errorMessage,
		onSubmit,
		loginMutation
	} = useLoginForm()

	return (
		<div className="container flex justify-center items-center min-h-screen">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">Login</CardTitle>
				</CardHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								{...register("email")}
								placeholder="Enter your email"
							/>
							{errors.email && (
								<p className="text-sm text-red-500">{errors.email.message}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								{...register("password")}
								placeholder="Enter your password"
							/>
							{errors.password && (
								<p className="text-sm text-red-500">
									{errors.password.message}
								</p>
							)}
						</div>
						{errorMessage && (
							<Alert variant="destructive">
								<AlertDescription>{errorMessage}</AlertDescription>
							</Alert>
						)}
					</CardContent>
					<CardFooter>
						<Button
							type="submit"
							className="w-full"
							disabled={loginMutation.isPending}
						>
							{loginMutation.isPending ? "Logging in..." : "Login"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	)
}
