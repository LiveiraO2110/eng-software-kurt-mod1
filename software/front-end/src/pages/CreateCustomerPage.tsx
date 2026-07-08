import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageHeader } from "../components/AppLayout"
import { ErrorMessage } from "../components/Feedback"
import { useAuth } from "../context/AuthContext"
import * as api from "../lib/api"
import { ApiError } from "../lib/api"

export function CreateCustomerPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (user?.id == null) {
      setError(
        "Não foi possível identificar o seu usuário. Faça login novamente.",
      )
      return
    }
    setError(null)
    setLoading(true)
    try {
      const created = await api.createCustomer({
        userId: user.id,
        name: name.trim(),
      })
      navigate(`/clientes/${created.id}`)
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Erro ao cadastrar o cliente.",
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Cadastrar Cliente"
        description="Adicione um novo cliente para monitorar editais."
      />

      <div className="card" style={{ maxWidth: 520 }}>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Nome do cliente</label>
            <input
              id="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Hélio Ferragens"
              required
            />
          </div>

          {error && (
            <div style={{ marginBottom: "1rem" }}>
              <ErrorMessage message={error} />
            </div>
          )}

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? <span className="spinner" aria-hidden /> : "Cadastrar"}
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate("/clientes")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
