import { useCallback, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { PageHeader } from "../components/AppLayout"
import { Loading, ErrorMessage, EmptyState } from "../components/Feedback"
import { ProcurementTable } from "../components/ProcurementTable"
import { UF_LIST } from "../lib/constants"
import * as api from "../lib/api"
import { ApiError } from "../lib/api"
import type { Customer, Procurement, SearchTerm } from "../lib/types"

export function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const customerId = Number(id)

  const [customer, setCustomer] = useState<Customer | null>(null)
  const [terms, setTerms] = useState<SearchTerm[]>([])
  const [procurements, setProcurements] = useState<Procurement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // new term form
  const [termText, setTermText] = useState("")
  const [selectedStates, setSelectedStates] = useState<string[]>([])
  const [savingTerm, setSavingTerm] = useState(false)
  const [termError, setTermError] = useState<string | null>(null)

  const loadAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [c, t, p] = await Promise.all([
        api.getCustomer(customerId),
        api.getSearchTerms(customerId),
        api.getCustomerProcurements(customerId),
      ])
      setCustomer(c)
      setTerms(t)
      setProcurements(p)
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Erro ao carregar o cliente.",
      )
    } finally {
      setLoading(false)
    }
  }, [customerId])

  useEffect(() => {
    if (!Number.isNaN(customerId)) loadAll()
  }, [customerId, loadAll])

  async function handleAddTerm(e: React.FormEvent) {
    e.preventDefault()
    if (!termText.trim()) return
    setSavingTerm(true)
    setTermError(null)
    try {
      const created = await api.createSearchTerms({
        customerId,
        terms: [{ term: termText.trim(), states: selectedStates }],
      })
      setTerms((prev) => [...prev, ...created])
      setTermText("")
      setSelectedStates([])
    } catch (err) {
      setTermError(
        err instanceof ApiError ? err.message : "Erro ao salvar o termo.",
      )
    } finally {
      setSavingTerm(false)
    }
  }

  function toggleState(uf: string) {
    setSelectedStates((prev) =>
      prev.includes(uf) ? prev.filter((s) => s !== uf) : [...prev, uf],
    )
  }

  async function handleDeleteTerm(termId: number) {
    const prev = terms
    // optimistic update
    setTerms((t) => t.filter((x) => x.id !== termId))
    setTermError(null)
    try {
      await api.deleteSearchTerm(customerId, termId)
    } catch (err) {
      setTerms(prev) // rollback
      setTermError(
        err instanceof ApiError ? err.message : "Erro ao remover o termo.",
      )
    }
  }

  async function handleStatusChange(
    procurementId: number,
    status: Procurement["status"],
  ) {
    if (!status) return
    await api.updateProcurementStatus(procurementId, status)
    setProcurements((prev) =>
      prev.map((p) => (p.id === procurementId ? { ...p, status } : p)),
    )
  }

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />
  if (!customer) return <ErrorMessage message="Cliente não encontrado." />

  return (
    <>
      <PageHeader
        title={customer.name}
        description="Detalhes, termos de busca e editais do cliente."
        action={
          <Link to="/clientes" className="btn btn-outline">
            Voltar
          </Link>
        }
      />

      {/* Search terms */}
      <section className="card" style={{ marginBottom: "1.5rem" }}>
        <h2
          style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem" }}
        >
          Termos de busca
        </h2>

        {terms.length === 0 ? (
          <p className="muted" style={{ marginBottom: "1.25rem" }}>
            Nenhum termo cadastrado.
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1.25rem",
            }}
          >
            {terms.map((t) => (
              <span key={t.id} className="chip chip-removable">
                {t.term}
                <button
                  type="button"
                  className="chip-remove"
                  onClick={() => handleDeleteTerm(t.id)}
                  aria-label={`Remover termo ${t.term}`}
                  title="Remover termo"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}

        <form
          onSubmit={handleAddTerm}
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.25rem",
          }}
        >
          <div className="field" style={{ maxWidth: 420 }}>
            <label htmlFor="term">Novo termo</label>
            <input
              id="term"
              className="input"
              value={termText}
              onChange={(e) => setTermText(e.target.value)}
              placeholder="Ex: ferragem"
            />
          </div>

          <div className="field">
            <label>Estados (UF)</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.4rem",
                maxWidth: 640,
              }}
            >
              {UF_LIST.map((uf) => {
                const active = selectedStates.includes(uf)
                return (
                  <button
                    key={uf}
                    type="button"
                    onClick={() => toggleState(uf)}
                    className="btn btn-sm"
                    style={{
                      background: active ? "var(--primary)" : "transparent",
                      color: active ? "#fff" : "var(--text-muted)",
                      border: "1px solid var(--border)",
                      borderColor: active ? "var(--primary)" : "var(--border)",
                      minWidth: 44,
                    }}
                  >
                    {uf}
                  </button>
                )
              })}
            </div>
          </div>

          {termError && (
            <div style={{ marginBottom: "1rem" }}>
              <ErrorMessage message={termError} />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={savingTerm || !termText.trim()}
          >
            {savingTerm ? (
              <span className="spinner" aria-hidden />
            ) : (
              "Adicionar termo"
            )}
          </button>
        </form>
      </section>

      {/* Procurements */}
      <section className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "1.25rem 1.25rem 0" }}>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700 }}>
            Editais do cliente
          </h2>
        </div>
        {procurements.length === 0 ? (
          <EmptyState
            title="Nenhum edital encontrado"
            description="Os editais aparecem automaticamente conforme os termos de busca."
          />
        ) : (
          <ProcurementTable
            procurements={procurements}
            onStatusChange={handleStatusChange}
          />
        )}
      </section>
    </>
  )
}
