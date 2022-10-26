import '../styles/globals.css'
import { useEffect, useState } from 'react'
import DashboardLayout from '../components/layout/dashboardLayout'
import VoteLayout from '../components/layout/voteLayout'
import GlobalServices from '../services/globalServices'
import Login from './login'
import { theme } from '../components/theme/Theme'
import { CssBaseline, ThemeProvider } from '@mui/material'

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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <VoteLayout>
            <Component {...pageProps} />
          </VoteLayout>
        </ThemeProvider>
      )}

      {['societyContact', 'employee'].includes(role) && hasToken && (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        </ThemeProvider>
      )}
    </>
  )
}

export default MyApp
