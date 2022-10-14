import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import VoterLogin from "./pages/login/VoterLogin";
import ScAdminLogin from "./pages/login/ScAdminLogin";
import Dashboard from "./pages/Dashboard";
import Society from "./pages/Society";
import Sql from "./pages/Sql";
import Candidate from "./pages/Candidate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Dashboard />} />
        <Route path="/ScAdminLogin" element={<ScAdminLogin />} />
        <Route path="/VoterLogin" element={<VoterLogin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Society" element={<Society />} />
        <Route path="/Candidate" element={<Candidate />} />
        <Route path="/Sql" element={<Sql />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
