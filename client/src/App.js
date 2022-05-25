import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RegisterEvent from "./pages/RegisterEvent";
import { Container, Box } from "@chakra-ui/react";

function App() {
  // var headerHeight = document.getElementById("header").clientHeight;

  return (
    <Router>
      <Box h="100vh">
        <Header id="header" />
        {/* Height of Container needs to be 100vh - headerHeight but idk how to do */}
        <Container maxW="container.xl" p={0} h="100%">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registerEvent" element={<RegisterEvent/>} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
