import { useEffect, useState } from "react";
import "./LoginPage.css";
import { toast } from "react-toastify";
import { useAuthContext } from "../../contexts/AuthContext/useAuthContext";
import { ROUTES } from "../../routes/path";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useLogin";

export function LoginPage() {
    const { authData } = useAuthContext()
    const { logar } = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    useEffect(() => {
        if(authData.isAuthenticated) navigate(ROUTES.HOMEPAGE)
    }, [authData.isAuthenticated, navigate])

    async function handleLogin() {
        if(!username || !password){
            toast.error("Credenciais inválidas")
            return
        }

        try{
            await logar(username, password)
            toast.success("Login realizado com sucesso!");
            navigate(ROUTES.HOMEPAGE)
        } catch(er){

            toast.error("Email ou senha inválidos")
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Motor de Busca</h1>

                <form>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Digite seu e-mail"
                            onChange={(v) => setUsername(v.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Digite sua senha"
                            onChange={(v) => setPassword(v.target.value)}
                        />
                    </div>

                    <button type="button" onClick={handleLogin}>
                        Entrar
                    </button>
                    <div className="register_footer">
                        <p>Não tem uma conta? <a href={ROUTES.REGISTER_CLIENTE}>Cadastre-se</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}