import { api } from "@/helpers"
import { delay } from "@/utils"

export const userAPI = {
	get: async (id: number) => {
		return await api
			.get(`/api/example_app/example/${id}`)
			.then((res) => res.data)
	},
	getAll: async () => {
		return await api
			.get(`/api/example_app/example`)
			.then((res) => res.data)
			.then(delay(2000))
	},
	add: async (user: object) => {
		return await api.post(`/api/example_app/example/`, user)
	}
}
