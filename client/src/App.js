import React, {useEffect, useState} from 'react'

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
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => (
          <p key = {i}>{user}</p>
        ))
      )}
    </div>
  )
}

export default App