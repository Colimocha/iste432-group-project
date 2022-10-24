import { useEffect, useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import '../styles/globals.css'
import Login from './Login'

function MyApp({ Component, pageProps }) {
  const [role, setRole] = useState('')
  const [hasToken, SetToken] = useState(false)

  useEffect(() => {
    setRole(sessionStorage.getItem('role') ?? '')
    SetToken(sessionStorage.getItem('token') ?? '')
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
