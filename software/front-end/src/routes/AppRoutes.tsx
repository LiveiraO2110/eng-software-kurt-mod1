import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ROUTES } from "./path";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { AuthContextProvider } from "../contexts/AuthContext/AuthContextProvider";
import { AuthContextGuard } from "../contexts/AuthContext/AuthContextGuard";
import { HomePage } from "../pages/HomePage/HomePage";
import { ClientRegisterPage } from "../pages/ClientRegisterPage/ClientRegisterPage";

export function AppRoutes(){
    return(
        <AuthContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<AuthContextGuard/>}>
                        
                        <Route path={ROUTES.HOMEPAGE} element={<HomePage/>}/>
                    </Route>
                    
                    <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
                    <Route path={ROUTES.REGISTER_CLIENTE} element={<ClientRegisterPage/>}/>

                    <Route path="*" element={<Navigate to={ROUTES.HOMEPAGE}/>}/>
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    )
}