import type { Procurement, ProcurementStatus } from "../lib/types"
import { formatDateTime } from "../lib/constants"

const STATUSES: ProcurementStatus[] = ["PENDENTE", "APROVADO", "DESCARTADO"]

export function ProcurementTable({
  procurements,
  onStatusChange,
  showCustomer = false,
}: {
  procurements: Procurement[]
  onStatusChange: (id: number, status: ProcurementStatus) => void | Promise<void>
  showCustomer?: boolean
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            {showCustomer && <th>Cliente</th>}
            <th>Órgão / Cidade</th>
            <th>UF</th>
            <th>Abertura</th>
            <th>Encerramento</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {procurements.map((p) => (
            <tr key={p.id}>
              <td style={{ maxWidth: 320 }}>
                <div style={{ fontWeight: 600 }}>{p.description}</div>
                <div
                  className="muted"
                  style={{ fontSize: "0.78rem", marginTop: "0.15rem" }}
                >
                  {p.modalidade} · {p.pncpId}
                </div>
              </td>
              {showCustomer && <td>{p.customer}</td>}
              <td>
                <div>{p.name}</div>
                <div className="muted" style={{ fontSize: "0.78rem" }}>
                  {p.city}
                </div>
              </td>
              <td>{p.uf}</td>
              <td>{formatDateTime(p.openDate)}</td>
              <td>{formatDateTime(p.closeDate)}</td>
              <td>
                <select
                  className="select"
                  value={p.status || "PENDENTE"}
                  onChange={(e) =>
                    onStatusChange(p.id, e.target.value as ProcurementStatus)
                  }
                  style={{ padding: "0.35rem 0.5rem", fontSize: "0.8rem" }}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  Ver edital
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
