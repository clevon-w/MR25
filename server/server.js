/**
 * server.js typically handles your app startup, routing and other functions of your application and does require other modules to add functionality.
 * It would also become a basic HTTP web server replacing the role of something more traditional like Apache
 */

// import express, mongoose and middleware
const express = require('express')
const mongoose = require('mongoose')
const errorMiddleware = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

// load env variables
const dotenv = require('dotenv').config()
const port = process.env.PORT

// connect database
connectDB()

// create express app
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// setup routes to mongodb
app.use('/api/users', require('./routes/userRoutes'))

// use error handling middleware last
app.use(errorMiddleware.errorHandler)

// start backend
app.listen(port, () => { console.log(`Server started on port ${port}`) })