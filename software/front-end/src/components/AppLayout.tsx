import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"

export function AppLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          background: "var(--content-bg)",
          padding: "2rem 2.5rem",
          minWidth: 0,
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "1rem",
        marginBottom: "1.75rem",
      }}
    >
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text)" }}>
          {title}
        </h1>
        {description && (
          <p style={{ color: "var(--text-muted)", marginTop: "0.35rem" }}>
            {description}
          </p>
        )}
      </div>
      {action}
    </header>
  )
}
