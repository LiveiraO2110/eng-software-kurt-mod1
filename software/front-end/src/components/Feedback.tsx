export function Loading({ label = "Carregando..." }: { label?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "2rem 0",
        color: "var(--text-muted)",
      }}
    >
      <span className="spinner" aria-hidden />
      <span>{label}</span>
    </div>
  )
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div
      role="alert"
      style={{
        background: "var(--danger-bg)",
        color: "var(--danger)",
        border: "1px solid #fecaca",
        borderRadius: "var(--radius)",
        padding: "0.75rem 1rem",
        fontSize: "0.88rem",
        fontWeight: 500,
      }}
    >
      {message}
    </div>
  )
}

export function EmptyState({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "3rem 1rem",
        color: "var(--text-muted)",
      }}
    >
      <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "0.25rem" }}>
        {title}
      </p>
      {description && <p style={{ fontSize: "0.9rem" }}>{description}</p>}
    </div>
  )
}
