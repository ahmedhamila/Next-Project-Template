import { api, setCookie } from "@/helpers";
import { AxiosResponse } from "axios";

export type TokenRequest = {
    email: string
    password: string
  }

  export type User = {
    id?: number
    username?: string
    email: string
    firstName?: string
    lastName?: string
    phoneNumber?: string
    userType?: string
    image?: string
  }

export const getTokens = async (
    tokenData: TokenRequest
  ): Promise<AxiosResponse<{ access: string; refresh: string; user: User }>> => {
    try {
      const response = await api.post<{
        access: string
        refresh: string
        user: User
      }>('/api/users/login-email/', tokenData)
      setCookie('accessToken', response.data.access)
      setCookie('refreshToken', response.data.refresh)
      setCookie('user', JSON.stringify(response.data.user))
      setCookie('userType', response.data.user.userType as string)
      return response
    } catch (error) {
      throw error
    }
  }