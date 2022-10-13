import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';


const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#0077B6",
            backgroundImage: `linear-gradient(120deg, #00359B 0%, #25BBB2 55%, #03D7FF 100%)`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          },
        },
      },
    }
})
  
export default theme;
