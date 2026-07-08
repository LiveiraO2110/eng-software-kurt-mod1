import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { PageHeader } from "../components/AppLayout"
import { Loading, ErrorMessage, EmptyState } from "../components/Feedback"
import * as api from "../lib/api"
import { ApiError } from "../lib/api"
import type { Customer } from "../lib/types"

export function CustomersPage() {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await api.getCustomers()
        if (active) setCustomers(data)
      } catch (err) {
        if (active)
          setError(
            err instanceof ApiError
              ? err.message
              : "Erro ao carregar os clientes.",
          )
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <PageHeader
        title="Seus Clientes"
        description="Gerencie os clientes e seus termos de busca."
        action={
          <Link to="/clientes/novo" className="btn btn-primary">
            Novo Cliente
          </Link>
        }
      />

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : customers.length === 0 ? (
        <div className="card">
          <EmptyState
            title="Nenhum cliente cadastrado"
            description="Cadastre seu primeiro cliente para começar a monitorar editais."
          />
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Termos de busca</th>
                  <th>Editais</th>
                  <th style={{ width: 120 }} />
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr
                    key={c.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/clientes/${c.id}`)}
                  >
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td>{c.searchTerms?.length ?? 0}</td>
                    <td>{c.procurements ?? 0}</td>
                    <td>
                      <Link
                        to={`/clientes/${c.id}`}
                        className="btn btn-outline btn-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}
