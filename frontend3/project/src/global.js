import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';


export const theme = createTheme({
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

export function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 8, mb: 4, color: "#FFFFFF" }}
            {...props}>
        {'Copyright © '}
        All Right Reserved. & About Information&nbsp;
        {new Date().getFullYear()}
        {'.'}
        
      </Typography>
    );
  }

export default { theme, Copyright };
