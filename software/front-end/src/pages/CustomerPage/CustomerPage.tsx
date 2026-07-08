import "./CustomerPage.css";
import { useCustomersById } from "../../hooks/useCustomerById";
import { useNavigate, useParams } from "react-router";
import { useProcurementsByCustomer } from "../../hooks/useProcurementsByCustomer";
import { ROUTES } from "../../routes/path";

export const CustomerPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { customer, isLoading, error } = useCustomersById(id);
    const { procurements, isLoading: isLoadingProcurements, error: errorProcurements } = useProcurementsByCustomer(id);

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("pt-BR");
    };

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return "-";
        return new Date(dateTimeString).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
        });
    };

    if(isLoading || isLoadingProcurements) return

    if(error) return

    if(errorProcurements) return

    return (
        <div className="customer_container">
        <header className="customer_header">
            <div className="customer_title_zone">
            <span className="badge_id">ID: #{customer.id}</span>
            <h2>{customer.name}</h2>
            </div>
            <button className="btn_back" onClick={() => navigate(ROUTES.HOMEPAGE)}>Voltar para a Home Page</button>
        </header>
        <div className="customer_dashboard_layout">
            <aside className="dashboard_sidebar">
            <div className="customer_card metric_card">
                <h3>Total de Editais</h3>
                <div className="metric_value">{procurements.length}</div>
                <p className="metric_subtitle">Editais mapeados pelo sistema</p>
            </div>

            <div className="customer_card terms_card">
                <div className="card_header_action">
                <h3>Termos Monitorados</h3>
                <button className="btn_add_term">+</button>
                </div>
                {customer.searchTerms.length > 0 ? (
                <div className="terms_tags_container">
                    {customer.searchTerms.map((termObj) => (
                    <div key={termObj.id} className="term_tag">
                        <span>{termObj.term}</span>
                        <button className="btn_delete_term">&times;</button>
                    </div>
                    ))}
                </div>
                ) : (
                <p className="empty_message">Nenhum termo cadastrado.</p>
                )}
            </div>
            </aside>

            <main className="dashboard_main_content">
            <div className="customer_card procurements_card">
                <div className="card_header_action">
                <h3>Editais Encontrados (PNCP)</h3>
                </div>

                {procurements.length > 0 ? (
                <div className="procurements_list">
                    {procurements.map((proc) => (
                    <div key={proc.id} className="procurement_item">
                        
                        <div className="procurement_item_header">
                        <div>
                            <span className="procurement_modalidade">{proc.modalidade}</span>
                            <h4 className="procurement_orgao">{proc.name}</h4>
                            <span className="procurement_cnpj">CNPJ: {proc.cnpj}</span>
                        </div>
                        <div className="procurement_location">
                            <span>{proc.city} - {proc.uf}</span>
                        </div>
                        </div>

                        <p className="procurement_description">{proc.description}</p>

                        <div className="procurement_meta_grid">
                            <div className="meta_info">
                                <span className="meta_label">ID PNCP:</span>
                                <span className="meta_value code_style">{proc.pncpId}</span>
                            </div>
                            <div className="meta_info">
                                <span className="meta_label">Inserido em:</span>
                                <span className="meta_value">{formatDate(proc.insertDate)}</span>
                            </div>
                            <div className="meta_info">
                                <span className="meta_label">Abertura:</span>
                                <span className="meta_value date_open">{formatDateTime(proc.openDate)}</span>
                            </div>
                            <div className="meta_info">
                                <span className="meta_label">Abertura/Fechamento:</span>
                                <span className="meta_value date_close">{formatDateTime(proc.closeDate)}</span>
                            </div>
                        </div>

                        <div className="procurement_item_footer">
                            <a href={proc.link} target="_blank" rel="noopener noreferrer" className="btn_view_procurement">
                                Ver Edital Original ↗
                            </a>
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <p className="empty_message">Nenhum edital capturado para os critérios deste cliente.</p>
                )}
            </div>
            </main>

        </div>
        </div>
    );
};