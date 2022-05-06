// import express
const express = require('express')

// in order to create our app
const app = express()

// setup route for api (this here is basically our backend api)
// localhost:8000/api or /whatever you put inside the get
app.get("/api", (req, res) => {
    // sending a json array of users
    res.json({"users": ["user1",  "user2", "user3"]})
})

// in order to start our backend 
// (our backend will be on port 5000, frontend will be default port 3000)
// once the server is listening on port 5000 we need some sort of message to tall us that it is listening on port 5000
// npm run <something> to run the scripts from package.json
app.listen(8000, () => { console.log("Server started on port 8000") })