import { useState } from "react";
import "./ClientRegisterPage.css";
import { ROUTES } from "../../routes/path";
import { AuthServices } from "../../services/authServices";
import type { UserRequest } from "../../types/UserRequest";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const ClientRegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<UserRequest>({
        name: "",
        email: "",
        password: ""
    });
    const authServices = new AuthServices()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await authServices.register(formData)
            toast.success("Cadastro realizado com sucesso! Faça login para continuar.")
            navigate(ROUTES.LOGIN)
        } catch (error) {
            toast.error("Erro ao cadastrar. Tente novamente.")
        }
    };

    return (
        <div className="register_container">
            <div className="register_card">
                <h2>Criar Conta</h2>
                <p>Preencha os dados abaixo para se cadastrar</p>

                <form onSubmit={handleSubmit} className="register_form">
                    <div className="form_group">
                        <label htmlFor="name">Nome completo</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Digite seu nome" 
                            required 
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form_group">
                        <label htmlFor="email">E-mail</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="seu.email@exemplo.com" 
                            required 
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form_group">
                        <label htmlFor="password">Senha</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Crie uma senha forte" 
                            required 
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn_register">
                        Registrar
                    </button>
                </form>

                <div className="register_footer">
                    <p>Já tem uma conta? <a href={ROUTES.LOGIN}>Faça login</a></p>
                </div>
            </div>
        </div>
    );
};