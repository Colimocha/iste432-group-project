import {
  Alert,
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
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import AuthServices from '../services/authServices'

export default function Login() {
  const [role, setRole] = useState(true)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openError, setOpenError] = useState(false)

  const handleSwitchAdminLogin = () => {
    setRole(false)
  }

  const handleSwitchVoterLogin = () => {
    setRole(true)
  }

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const formData = new FormData(event.currentTarget)

    const data = role
      ? // Voter Login
        {
          cred_1: formData.get('credential1'),
          cred_2: formData.get('credential2'),
        }
      : // Dashboard Login
        {
          username: formData.get('username'),
          password: formData.get('password'),
          role: formData.get('role'),
        }

    // Send the data to the server.
    const response = role
      ? await AuthServices.authVoter(data)
      : await AuthServices.authDashboard(data)

    // Check if the response is successful then redirect to page, otherwise display error.
    console.log(response)
    if (response) {
      setOpenSuccess(true)
      window.location.reload()
    } else {
      setOpenError(true)
    }
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

        <Box component="form" noValidate sx={{ mt: 4 }} onSubmit={handleSubmit}>
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
                label="Role"
                name="role"
              >
                <MenuItem value={'societyContact'}>Society Contact</MenuItem>
                <MenuItem value={'employee'}>Employee</MenuItem>
              </Select>
              <FormHelperText>Select the role</FormHelperText>
            </FormControl>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="bg-blue-500 hover:bg-blue-700"
            sx={{ mt: 2, mb: 2, padding: 1.5 }}
            // onClick={role ? handleVoterLogin : handleDashboardLogin}
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
      <Snackbar
        open={openSuccess}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Login Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Login Failed
        </Alert>
      </Snackbar>
    </Container>
  )
}
