import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Container } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container maxW="container.xl" p={0}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
