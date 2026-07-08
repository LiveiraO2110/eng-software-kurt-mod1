import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ApiError } from "../lib/api"
import { ErrorMessage } from "../components/Feedback"

type Mode = "login" | "register"

export function AuthPage({ mode }: { mode: Mode }) {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isRegister = mode === "register"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (isRegister) {
        await register(name, email, password)
      } else {
        await login(email, password)
      }
      navigate("/", { replace: true })
    } catch (err) {
      const msg =
        err instanceof ApiError
          ? err.message
          : "Ocorreu um erro inesperado. Tente novamente."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  function switchMode() {
    navigate(isRegister ? "/login" : "/register", {
      replace: true,
      state: location.state,
    })
    setError(null)
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--sidebar-bg)",
        padding: "1.5rem",
      }}
    >
      <div
        className="card"
        style={{ width: "100%", maxWidth: 400, padding: "2rem" }}
      >
        <h1
          style={{
            fontSize: "1.6rem",
            fontWeight: 800,
            marginBottom: "0.25rem",
          }}
        >
          Motor de Busca
        </h1>
        <p className="muted" style={{ marginBottom: "1.5rem", fontSize: "0.9rem" }}>
          {isRegister
            ? "Crie sua conta para começar."
            : "Entre na sua conta para continuar."}
        </p>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="field">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isRegister ? "new-password" : "current-password"}
            />
          </div>

          {error && (
            <div style={{ marginBottom: "1rem" }}>
              <ErrorMessage message={error} />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner" aria-hidden />
            ) : isRegister ? (
              "Cadastrar"
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.25rem",
            fontSize: "0.88rem",
          }}
          className="muted"
        >
          {isRegister ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
          <button
            type="button"
            onClick={switchMode}
            style={{
              background: "none",
              border: "none",
              color: "var(--primary)",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {isRegister ? "Entrar" : "Cadastre-se"}
          </button>
        </p>
      </div>
    </div>
  )
}
