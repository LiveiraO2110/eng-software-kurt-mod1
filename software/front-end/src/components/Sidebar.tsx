import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  display: "block",
  padding: "0.55rem 0.75rem",
  borderRadius: "6px",
  fontSize: "0.92rem",
  fontWeight: 500,
  color: isActive ? "#fff" : "var(--sidebar-text)",
  background: isActive ? "var(--primary)" : "transparent",
})

export function Sidebar() {
  const { user, logout } = useAuth()
  const initial = (user?.name?.[0] || "?").toUpperCase()

  return (
    <aside
      style={{
        width: 280,
        minWidth: 280,
        background: "var(--sidebar-bg)",
        color: "var(--sidebar-text)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      {/* User */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.85rem",
          padding: "1.5rem 1.25rem",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "var(--primary)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "1.1rem",
          }}
          aria-hidden
        >
          {initial}
        </div>
        <div>
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              color: "var(--sidebar-muted)",
              textTransform: "uppercase",
            }}
          >
            Bem-vindo
          </p>
          <p style={{ fontWeight: 700, color: "#fff" }}>{user?.name}</p>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: "var(--sidebar-border)",
          margin: "0 1.25rem",
        }}
      />

      {/* Nav */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          padding: "1.25rem 1rem",
          flex: 1,
        }}
      >
        <NavLink to="/" end style={linkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/clientes/novo" style={linkStyle}>
          Cadastrar Cliente
        </NavLink>
        <NavLink to="/clientes" end style={linkStyle}>
          Lista de Clientes
        </NavLink>
        <NavLink to="/editais" style={linkStyle}>
          Editais
        </NavLink>
      </nav>

      <div style={{ padding: "1rem" }}>
        <button
          className="btn btn-outline"
          style={{
            width: "100%",
            background: "transparent",
            color: "var(--sidebar-text)",
            borderColor: "var(--sidebar-border)",
          }}
          onClick={logout}
        >
          Sair
        </button>
      </div>
    </aside>
  )
}
