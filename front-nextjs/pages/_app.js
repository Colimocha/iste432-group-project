import { useEffect, useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import '../styles/globals.css'
import Login from './Login'

function MyApp({ Component, pageProps }) {
  const [role, setRole] = useState('')
  const [hasToken, setToken] = useState(false)

  useEffect(() => {
    setRole(sessionStorage.getItem('role') ?? '')
    setToken(sessionStorage.getItem('token') ?? '')
  }, [])

  return (
    <>
      {role === '' && <Login />}

      {role === 'voter' && <Component {...pageProps} />}

      {['societyContact', 'employee'].includes(role) && (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      )}
    </>
  )
}

export default MyApp
