import { ToastContainer } from 'react-toastify'
import './App.css'
import { AppRoutes } from './routes/AppRoutes'

export function App() {
  return(
    <>
      <AppRoutes/>
      <ToastContainer/>
    </>
  )
}

export default App