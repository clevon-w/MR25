/**
 * server.js typically handles your app startup, routing and other functions of your application and does require other modules to add functionality.
 * It would also become a basic HTTP web server replacing the role of something more traditional like Apache
 */

// import express and mongoose
const express = require('express')
const mongoose = require('mongoose')

// load env variables
const dotenv = require('dotenv').config()
const port = process.env.PORT

// import controllers
const userController = require("./controllers/user")

mongoose
  .connect("mongodb+srv://MR25-admin:MR25-password@mr25-cluster.9slgm.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => {
    // create express app
    const app = express()

    // middleware
    app.use(express.json())

    // setup routes to mongodb
    app.get("/users", userController.findUsers)
    app.post("/users", userController.createUser)
    app.get("/users/:id", userController.findUser)
    app.patch("/users/:id", userController.updateUser)
    app.delete("/users/:id", userController.deleteUser)

    // start backend
    app.listen(port, () => { console.log("Server started on port ${port}") })
  })
  .catch(() => {
    console.log("Database connection failed!")
  })