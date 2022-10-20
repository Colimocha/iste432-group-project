import { theme, url } from "./../global.js";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";

import Box from "@mui/material/Box";

import Navbar from "./Navbar.js";

const apiUrl = "/ballot";

export default function Dashboard() {
  useEffect(() => {
    const requestOptions = {
      method: "get",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    fetch(url + apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //do something with the data
      });
  }, []);

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
          <h1> Dashboard </h1>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
