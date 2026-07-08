import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { AppLayout } from "./components/AppLayout"
import { AuthPage } from "./pages/AuthPage"
import { DashboardPage } from "./pages/DashboardPage"
import { CreateCustomerPage } from "./pages/CreateCustomerPage"
import { CustomersPage } from "./pages/CustomersPage"
import { CustomerDetailPage } from "./pages/CustomerDetailPage"
import { ProcurementsPage } from "./pages/ProcurementsPage"

function PublicOnly({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicOnly>
                <AuthPage mode="login" />
              </PublicOnly>
            }
          />
          <Route
            path="/register"
            element={
              <PublicOnly>
                <AuthPage mode="register" />
              </PublicOnly>
            }
          />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/clientes" element={<CustomersPage />} />
              <Route path="/clientes/novo" element={<CreateCustomerPage />} />
              <Route path="/clientes/:id" element={<CustomerDetailPage />} />
              <Route path="/editais" element={<ProcurementsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
