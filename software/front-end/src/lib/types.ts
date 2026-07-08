export interface User {
  id: number
  name: string
}

export interface SearchTerm {
  id: number
  term: string
  customerId: number
}

export interface Customer {
  id: number
  name: string
  searchTerms: SearchTerm[]
  procurements: number
}

export type ProcurementStatus = "PENDENTE" | "APROVADO" | "DESCARTADO"

export interface Procurement {
  id: number
  pncpId: string
  customerId: number
  customer: string
  status?: ProcurementStatus
  description: string
  city: string
  uf: string
  insertDate: string
  openDate: string
  closeDate: string
  cnpj: string
  name: string
  modalidade: string
  link: string
}

export interface TermInput {
  term: string
  states: string[]
}
