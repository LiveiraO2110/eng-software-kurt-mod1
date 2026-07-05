import { SideBarCustomers } from "../../components/SideBarCustomers"
import { useAuthContext } from "../../contexts/AuthContext/useAuthContext"
import "./ClientRegisterPage.css"

export const ClientRegisterPage = () => {
    const { authData } = useAuthContext();

    return (
        <div className="homepage">
            <aside className="barra-lateral">
                <div className="user-profile">
                    <div className="user-avatar">
                        {authData.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                        <span className="user-label">Bem-vindo</span>
                        <h2 className="user-name">{authData.user.name}</h2>
                    </div>
                </div>

                <hr className="divisor" />

                
                <div className="sidebar-section">
                    <h3>Seus Clientes</h3>
                    <SideBarCustomers />
                </div>
            </aside>

            <main className="conteudo">
                CONTEUDO
            </main>
        </div>
    );
};