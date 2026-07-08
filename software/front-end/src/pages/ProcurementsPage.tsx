import { useCallback, useEffect, useState } from "react"
import { PageHeader } from "../components/AppLayout"
import { Loading, ErrorMessage, EmptyState } from "../components/Feedback"
import { ProcurementTable } from "../components/ProcurementTable"
import { UF_LIST } from "../lib/constants"
import * as api from "../lib/api"
import { ApiError } from "../lib/api"
import type { Customer, Procurement, ProcurementStatus } from "../lib/types"

export function ProcurementsPage() {
  const [procurements, setProcurements] = useState<Procurement[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  // filters
  const [filterOpen, setFilterOpen] = useState(false)
  const [customerId, setCustomerId] = useState("")
  const [date, setDate] = useState("")
  const [uf, setUf] = useState("")
  const [pncp, setPncp] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const loadAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [p, c] = await Promise.all([
        api.getProcurements(),
        api.getCustomers(),
      ])
      setProcurements(p)
      setCustomers(c)
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Erro ao carregar os editais.",
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!date) {
      setError("A data é obrigatória para a pesquisa.")
      return
    }
    setLoading(true)
    setError(null)
    try {
      const results = await api.searchProcurements({
        c: customerId ? Number(customerId) : undefined,
        date,
        uf: uf || undefined,
        pncp: pncp || undefined,
      })
      setProcurements(results)
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Erro ao pesquisar editais.",
      )
    } finally {
      setLoading(false)
    }
  }

  function clearFilters() {
    setCustomerId("")
    setDate("")
    setUf("")
    setPncp("")
    setStatusFilter("")
    loadAll()
  }

  async function handleStatusChange(id: number, status: ProcurementStatus) {
    await api.updateProcurementStatus(id, status)
    setProcurements((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p)),
    )
  }

  async function handleDeleteDiscarded() {
    if (
      !window.confirm(
        "Remover todos os editais com status DESCARTADO? Esta ação não pode ser desfeita.",
      )
    )
      return
    setDeleting(true)
    try {
      await api.deleteDiscarded()
      await loadAll()
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Erro ao remover editais descartados.",
      )
    } finally {
      setDeleting(false)
    }
  }

  const visible = statusFilter
    ? procurements.filter((p) => (p.status || "PENDENTE") === statusFilter)
    : procurements

  return (
    <>
      <PageHeader
        title="Editais"
        description="Todos os editais monitorados para os seus clientes."
        action={
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              className="btn btn-outline"
              onClick={() => setFilterOpen((v) => !v)}
            >
              Filtros
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDeleteDiscarded}
              disabled={deleting}
            >
              {deleting ? (
                <span className="spinner" aria-hidden />
              ) : (
                "Limpar descartados"
              )}
            </button>
          </div>
        }
      />

      {filterOpen && (
        <form
          className="card"
          onSubmit={handleSearch}
          style={{ marginBottom: "1.5rem" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
            }}
          >
            <div className="field" style={{ margin: 0 }}>
              <label htmlFor="f-customer">Cliente</label>
              <select
                id="f-customer"
                className="select"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
              >
                <option value="">Todos</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field" style={{ margin: 0 }}>
              <label htmlFor="f-date">Data *</label>
              <input
                id="f-date"
                type="date"
                className="input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="field" style={{ margin: 0 }}>
              <label htmlFor="f-uf">UF</label>
              <select
                id="f-uf"
                className="select"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
              >
                <option value="">Todas</option>
                {UF_LIST.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
            <div className="field" style={{ margin: 0 }}>
              <label htmlFor="f-pncp">ID PNCP</label>
              <input
                id="f-pncp"
                className="input"
                value={pncp}
                onChange={(e) => setPncp(e.target.value)}
                placeholder="Ex: 784"
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
            <button type="submit" className="btn btn-primary">
              Pesquisar
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={clearFilters}
            >
              Limpar
            </button>
          </div>
        </form>
      )}

      {/* Status quick filter */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        {["", "PENDENTE", "APROVADO", "DESCARTADO"].map((s) => (
          <button
            key={s || "TODOS"}
            className="btn btn-sm"
            onClick={() => setStatusFilter(s)}
            style={{
              background:
                statusFilter === s ? "var(--primary)" : "transparent",
              color: statusFilter === s ? "#fff" : "var(--text-muted)",
              border: "1px solid var(--border)",
              borderColor:
                statusFilter === s ? "var(--primary)" : "var(--border)",
            }}
          >
            {s || "TODOS"}
          </button>
        ))}
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : visible.length === 0 ? (
        <div className="card">
          <EmptyState
            title="Nenhum edital encontrado"
            description="Ajuste os filtros ou aguarde a próxima busca automática."
          />
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <ProcurementTable
            procurements={visible}
            onStatusChange={handleStatusChange}
            showCustomer
          />
        </div>
      )}
    </>
  )
}
