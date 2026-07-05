import { Navigate, Outlet } from "react-router"
import { useAuthContext } from "./useAuthContext"
import { ROUTES } from "../../routes/path"

export const AuthContextGuard = () => {
    const { authData } = useAuthContext()

    return authData.isAuthenticated ? <Outlet/> : <Navigate to={ROUTES.LOGIN}/>
}