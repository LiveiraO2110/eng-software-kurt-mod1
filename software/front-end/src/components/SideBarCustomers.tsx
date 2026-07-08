import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext/useAuthContext"
import { useCustomersByUser } from "../hooks/useCustomersByUser"
import "../pages/HomePage/HomePage.css"
import { ROUTES } from "../routes/path";

export const SideBarCustomers = () => {
    const navigate = useNavigate()
    const { authData } = useAuthContext();
    const { customers, isLoading, error } = useCustomersByUser(authData.user.id);

    if (isLoading) return <p className="status-msg">Carregando clientes...</p>;
    if (error) return <p className="status-msg error">Erro ao carregar.</p>;

    return (
        <div className="barra-lateral-customers">
            {customers.slice(0, 5)?.map((c) => (
                <div key={c.id} className="barra-lateral-customers-item" onClick={() => navigate(ROUTES.CUSTOMER_DETAILS.replace(":id", c.id.toString()))}>
                    <h4 className="customer-name">{c.name}</h4>
                    <span className="customer-badge">
                        Nº editais: <strong>{c.procurements}</strong>  
                    </span>
                </div>
            ))}
        </div>
    );
};