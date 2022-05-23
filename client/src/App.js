import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Register from './pages/Register' 
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Leaderboard from './pages/Leaderboard'
import MyAccount from './pages/MyAccount'
import UpdateUser from './pages/UpdateUser'
import { Container } from '@chakra-ui/react'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container maxW="container.xl" p={0}>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/register' element={<Register />} />
            <Route path='/Login' element={<Login />} />
            <Route path ='/Leaderboard' element={<Leaderboard />} />
            <Route path ='/MyAccount' element={<MyAccount />} />
            <Route path ='/UpdateUser' element={<UpdateUser />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
