import type {
  Customer,
  Procurement,
  ProcurementStatus,
  SearchTerm,
  TermInput,
  User,
} from "./types"

const BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ||
  "http://localhost:8080"

const TOKEN_KEY = "mb_token"

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}
export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  }
  if (token) headers.Authorization = `Bearer ${token}`

  let res: Response
  try {
    res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  } catch {
    throw new ApiError(
      0,
      `Não foi possível conectar à API em ${BASE_URL}. Verifique se o servidor está no ar.`,
    )
  }

  if (res.status === 204) return undefined as T

  const text = await res.text()
  const data = text ? safeParse(text) : null

  if (!res.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Erro ${res.status} ao chamar ${path}`
    throw new ApiError(res.status, message)
  }

  return data as T
}

function safeParse(text: string) {
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

/* ---------- Auth ---------- */
export function register(body: {
  name: string
  email: string
  password: string
}): Promise<User> {
  return request<User>("/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

export function login(body: {
  email: string
  password: string
}): Promise<{ token: string }> {
  return request<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

/* ---------- Customers ---------- */
export function getCustomers(): Promise<Customer[]> {
  return request<Customer[]>("/customers")
}

export function getCustomer(id: number): Promise<Customer> {
  return request<Customer>(`/customers/${id}`)
}

export function createCustomer(body: {
  userId: number
  name: string
}): Promise<Customer> {
  return request<Customer>("/customers", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

/* ---------- Search terms ---------- */
export function createSearchTerms(body: {
  customerId: number
  terms: TermInput[]
}): Promise<SearchTerm[]> {
  return request<SearchTerm[]>("/customers/search-terms", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

export function getSearchTerms(customerId: number): Promise<SearchTerm[]> {
  return request<SearchTerm[]>(`/customers/${customerId}/search-terms`)
}

/* ---------- Procurements ---------- */
export function getCustomerProcurements(
  customerId: number,
): Promise<Procurement[]> {
  return request<Procurement[]>(`/customers/${customerId}/procurements`)
}

export function getProcurements(): Promise<Procurement[]> {
  return request<Procurement[]>("/procurements")
}

export function searchProcurements(params: {
  c?: number
  date: string
  uf?: string
  pncp?: string
}): Promise<Procurement[]> {
  const query = new URLSearchParams()
  if (params.c != null) query.set("c", String(params.c))
  query.set("date", params.date)
  if (params.uf) query.set("uf", params.uf)
  if (params.pncp) query.set("pncp", params.pncp)
  return request<Procurement[]>(`/procurements/search?${query.toString()}`)
}

export function updateProcurementStatus(
  id: number,
  status: ProcurementStatus,
): Promise<void> {
  return request<void>(`/procurements/${id}/status/${status}`, {
    method: "PUT",
  })
}

export function deleteDiscarded(): Promise<void> {
  return request<void>("/procurements", { method: "DELETE" })
}
