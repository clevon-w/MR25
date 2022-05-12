import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Register from './pages/Register' 
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function App() {

  // create a state variable which will contain the backend data that we get from backend api
  const [backendData, setBackendData] = useState([{}])

  // fetch backend api
  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])


  return (
    <div>
      {/* this is just a ternary operator that checks if the backendData is undefined or not */}
      {(typeof backendData.users === "undefined") ? (
        <>
        <Router>
          <div className='container'>
           <Header />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/register' element={<Register />} />
              <Route path='/Login' element={<Login />} />
            </Routes>
          </div>
        </Router>
      </>
      ) : (
        backendData.users.map((user, i) => (
          <p key = {i}>{user}</p>
        ))
      )}
    </div>
  )
}

export default App