import { api } from "../api";
import type { UserDTO } from "../dtos/DTOS";

interface ResponseAuthLogin {
    token: string
}

export class AuthServices {
    constructor(){}

    me = async (token: string):Promise<UserDTO> => {
        console.log(token)
        const response = await api.get("/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        return response.data
    }

    login = async (email: string, password: string): Promise<string> => {
        const body = {email: email, password: password}
        const response = await api.post("/auth/login", body)
        const token: ResponseAuthLogin = response.data
        return token.token
    }
}