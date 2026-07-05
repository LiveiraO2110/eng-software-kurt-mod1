import { useAuthContext } from "../contexts/AuthContext/useAuthContext";
import type { UserDTO } from "../dtos/DTOS";
import { AuthServices } from "../services/authServices";

export function useAuth (){
    const { login } = useAuthContext()
    const authService = new AuthServices()

    async function logar(email: string, password: string) {
        const token: string = await authService.login(email, password)
        const user: UserDTO = await authService.me(token)

        login(user, token)
    }

    return { logar }
}