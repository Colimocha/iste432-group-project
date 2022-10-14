import { theme } from "./../global.js";
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';

import Box from "@mui/material/Box";

import Navbar from "./Navbar.js";

export default function Candidate() {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Navbar />
                <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            padding: 4,
          }}
        >
          <h1> Candidate </h1>
        </Box>
            </Container>
        </ThemeProvider>
    );
}