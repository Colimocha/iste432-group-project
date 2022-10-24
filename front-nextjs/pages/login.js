import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import GlobalServices from '../services/GlobalServices'

export default function Login() {
  const [role, setRole] = useState(true)
  const [selectRole, setSelectRole] = useState('')
  const globalServices = new GlobalServices()

  const handleSwitchAdminLogin = () => {
    setRole(false)
  }

  const handleSwitchVoterLogin = () => {
    setRole(true)
  }

  const handleVoterLogin = () => {
    console.log('Voter Login')
    globalServices.setVoterRole()

    // refresh page
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  const handleDashboardLogin = () => {
    console.log('Dashboard Login')
    if (selectRole === 'societyContact') {
      globalServices.setSocietyContactRole()
    } else if (selectRole === 'employee') {
      globalServices.setEmployeeRole()
    }

    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  const handleRoleChange = (event) => {
    setSelectRole(event.target.value)
  }

  return (
    <Container
      fixed
      component="main"
      className="w-full h-screen flex justify-center items-center"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          padding: 8,
          borderRadius: 2,
          width: '25em',
        }}
        className="shadow-2xl"
      >
        <Typography component="h1" variant="h5">
          Sign in {role ? 'as a Voter' : 'Dashboard'}
        </Typography>

        <Box component="form" noValidate sx={{ mt: 4 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id={role ? 'credential1' : 'username'}
            label={role ? 'Credential #1' : 'Username'}
            name={role ? 'credential1' : 'username'}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id={role ? 'credential2' : 'password'}
            label={role ? 'Credential #2' : 'Password'}
            name={role ? 'credential2' : 'password'}
            type={role ? 'text' : 'password'}
          />

          {!role && (
            <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth>
              <InputLabel id="select-role">Role</InputLabel>
              <Select
                labelId="select-role"
                id="selectRole"
                value={selectRole}
                label="Role"
                onChange={handleRoleChange}
              >
                <MenuItem value={'societyContact'}>Society Contact</MenuItem>
                <MenuItem value={'employee'}>Employee</MenuItem>
              </Select>
              <FormHelperText>Select the role</FormHelperText>
            </FormControl>
          )}

          <Button
            type="button"
            fullWidth
            variant="contained"
            className="bg-blue-500 hover:bg-blue-700"
            sx={{ mt: 2, mb: 2, padding: 1.5 }}
            onClick={role ? handleVoterLogin : handleDashboardLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                onClick={role ? handleSwitchAdminLogin : handleSwitchVoterLogin}
                className="cursor-pointer"
                variant="body2"
              >
                Switch {role ? 'Dashboard' : 'Voter'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
