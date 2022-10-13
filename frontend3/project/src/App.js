import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VoterLogin from "./pages/login/VoterLogin"
import ScAdminLogin from "./pages/login/ScAdminLogin"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/VoterLogin" element={<VoterLogin />} />
        <Route path="/ScAdminLogin" element={<ScAdminLogin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
