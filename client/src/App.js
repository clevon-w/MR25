import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RegisterEvent from "./pages/RegisterEvent";
import UploadResults from "./pages/UploadResults";
import Leaderboard from './pages/Leaderboard'
import MyAccount from './pages/MyAccount'
import UpdateUser from './pages/UpdateUser'
import UploadSuccess from "./pages/UploadSuccess";
import { Container, Box } from "@chakra-ui/react";

function App() {
  // var headerHeight = document.getElementById("header").clientHeight;

  return (
    <Router>
      <Box h="100vh">
        <Header id="header" />
        {/* Height of Container needs to be 100vh - headerHeight but idk how to do */}
        <Container maxW="2xl" my={[5, 10]} pb={["40px", "80px"]}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registerEvent" element={<RegisterEvent/>} />
            <Route path="/UploadResults" element={<UploadResults/>} />
            <Route path ='/Leaderboard' element={<Leaderboard />} />
            <Route path ='/MyAccount' element={<MyAccount />} />
            <Route path ='/UpdateUser' element={<UpdateUser />} />
            <Route path ='/UploadSuccess' element={<UploadSuccess />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
