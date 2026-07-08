import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import * as api from "../lib/api"

interface AuthUser {
  id: number | null
  name: string
  email: string
}

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  setUserId: (id: number) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const USER_KEY = "mb_user"

function loadStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

function decodeJwt(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1]
    if (!payload) return null
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    return JSON.parse(json)
  } catch {
    return null
  }
}

function buildUserFromToken(token: string, email: string): AuthUser {
  const claims = decodeJwt(token) || {}
  const rawId = claims.id ?? claims.userId ?? claims.sub
  const id =
    rawId != null && !Number.isNaN(Number(rawId)) ? Number(rawId) : null
  const name =
    (claims.name as string) ||
    (claims.username as string) ||
    email.split("@")[0]
  return {
    id,
    name,
    email: (claims.email as string) || email,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() =>
    api.getToken() ? loadStoredUser() : null,
  )

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
    else localStorage.removeItem(USER_KEY)
  }, [user])

  const login = useCallback(async (email: string, password: string) => {
    const { token } = await api.login({ email, password })
    api.setToken(token)
    setUser(buildUserFromToken(token, email))
  }, [])

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      await api.register({ name, email, password })
      const { token } = await api.login({ email, password })
      api.setToken(token)
      const built = buildUserFromToken(token, email)
      setUser({ ...built, name: name || built.name })
    },
    [],
  )

  const logout = useCallback(() => {
    api.clearToken()
    setUser(null)
  }, [])

  const setUserId = useCallback((id: number) => {
    setUser((prev) => (prev ? { ...prev, id } : prev))
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      setUserId,
    }),
    [user, login, register, logout, setUserId],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider")
  return ctx
}
