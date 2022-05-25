import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RegisterEvent from "./pages/RegisterEvent";
import { Container } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container maxW="container.md" p={8} centerContent >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registerEvent" element={<RegisterEvent/>} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
