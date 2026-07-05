import { api } from "../api"
import type { CustomerDTO } from "../dtos/DTOS"

export class UserServices {
    constructor(){}

    getCustomers = async (userId: number): Promise<CustomerDTO[]> => {
        const respose = await api.get(`/users/${userId}/customers`)
        return respose.data
    }
}