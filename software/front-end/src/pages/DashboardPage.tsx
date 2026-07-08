import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { PageHeader } from "../components/AppLayout"
import { Loading, ErrorMessage } from "../components/Feedback"
import * as api from "../lib/api"
import { ApiError } from "../lib/api"
import type { Customer, Procurement } from "../lib/types"

function StatCard({
  label,
  value,
  accent,
}: {
  label: string
  value: number | string
  accent?: string
}) {
  return (
    <div className="card" style={{ flex: 1, minWidth: 180 }}>
      <p
        className="muted"
        style={{
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          fontWeight: 600,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "2rem",
          fontWeight: 800,
          marginTop: "0.35rem",
          color: accent || "var(--text)",
        }}
      >
        {value}
      </p>
    </div>
  )
}

export function DashboardPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [procurements, setProcurements] = useState<Procurement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [c, p] = await Promise.all([
          api.getCustomers(),
          api.getProcurements(),
        ])
        if (!active) return
        setCustomers(c)
        setProcurements(p)
      } catch (err) {
        if (!active) return
        setError(
          err instanceof ApiError ? err.message : "Erro ao carregar os dados.",
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

  const stats = useMemo(() => {
    const pendentes = procurements.filter((p) => p.status === "PENDENTE").length
    const aprovados = procurements.filter((p) => p.status === "APROVADO").length
    const descartados = procurements.filter(
      (p) => p.status === "DESCARTADO",
    ).length
    return { pendentes, aprovados, descartados }
  }, [procurements])

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Visão geral dos seus clientes e editais monitorados."
      />

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "1.75rem",
            }}
          >
            <StatCard label="Clientes" value={customers.length} />
            <StatCard label="Editais" value={procurements.length} />
            <StatCard
              label="Pendentes"
              value={stats.pendentes}
              accent="var(--warning)"
            />
            <StatCard
              label="Aprovados"
              value={stats.aprovados}
              accent="var(--success)"
            />
          </div>

          <div className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700 }}>
                Editais recentes
              </h2>
              <Link to="/editais" className="btn btn-outline btn-sm">
                Ver todos
              </Link>
            </div>

            {procurements.length === 0 ? (
              <p className="muted" style={{ padding: "1rem 0" }}>
                Nenhum edital encontrado ainda.
              </p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Cliente</th>
                      <th>UF</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {procurements.slice(0, 5).map((p) => (
                      <tr key={p.id}>
                        <td style={{ maxWidth: 340 }}>{p.description}</td>
                        <td>{p.customer}</td>
                        <td>{p.uf}</td>
                        <td>
                          <span
                            className={`badge badge-${(
                              p.status || "PENDENTE"
                            ).toLowerCase()}`}
                          >
                            {p.status || "PENDENTE"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}
