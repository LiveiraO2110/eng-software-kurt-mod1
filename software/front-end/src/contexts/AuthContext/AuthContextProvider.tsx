import { createContext, useEffect, useState } from "react"
import type { UserDTO } from "../../dtos/DTOS"
import { AuthServices } from "../../services/authServices"
import { jwtDecode } from "jwt-decode"

interface JwtPayload {
    exp: number
}

interface AuthContextData {
    token: string
    user: UserDTO | null
    isAuthenticated: boolean
}

interface AuthContext {
    authData: AuthContextData
    login: (user: UserDTO, token: string) => void
    logout: () => void
    updateUser: (user: UserDTO) => void
}

export const AuthContext = createContext<AuthContext | null>(null)

const DEFAULT_DATA: AuthContextData = {
    token: "",
    user: null,
    isAuthenticated: false
}

const STORAGE_KEY: string = "auth"

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const [authData, setData] = useState<AuthContextData>(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : DEFAULT_DATA
    })
    const authServices = new AuthServices()
    

    useEffect(()=>{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authData))
    }, [authData])

    useEffect(() => {
        if (authData.token) {
            authServices.me(authData.token)
                .then(userAtualizado => {
                    updateUser(userAtualizado);
                })
                .catch(() => {
                    logout();
                });
        }
    }, []);

    if(authData.token){
        const decode = jwtDecode<JwtPayload>(authData.token)
        const isExpired = decode.exp * 1000 < Date.now()
        
        if(isExpired){
            logout()
        }
    }

    function login (user: UserDTO, token: string) {
        setData({
            user, 
            token,  
            isAuthenticated: true
        })
    }

    function logout () {
        setData(DEFAULT_DATA)
        localStorage.removeItem(STORAGE_KEY)
    }

    function updateUser(user: UserDTO){
        setData(prev => ({...prev, user}))
    }

    return(
        <AuthContext.Provider value={{authData, login, logout, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}