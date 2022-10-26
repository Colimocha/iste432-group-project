import '../styles/globals.css'
import { useEffect, useState } from 'react'
import DashboardLayout from '../components/layout/dashboardLayout'
import VoteLayout from '../components/layout/voteLayout'
import Login from './login'
import GlobalServices from '../lib/global'

function MyApp({ Component, pageProps }) {
  const [role, setRole] = useState('')
  const [hasToken, setToken] = useState(false)

  useEffect(() => {
    setRole(GlobalServices.getRole() ?? '')
    setToken(GlobalServices.getUserToken() ? true : false)
  }, [])

  return (
    <>
      {role === '' && <Login />}

      {role === 'voter' && hasToken && (
        <VoteLayout>
          <Component {...pageProps} />
        </VoteLayout>
      )}

      {['societyContact', 'employee'].includes(role) && hasToken && (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      )}
    </>
  )
}

export default MyApp
