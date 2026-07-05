import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";

export function useAuthContext(){
    const context = useContext(AuthContext)

    if(!context){
        throw new Error (
            "useAuthContext deve ser utilizado dentro de AuthContext"
        )
    }

    return context
}