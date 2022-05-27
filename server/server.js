/**
 * server.js typically handles your app startup, routing and other functions of your application and does require other modules to add functionality.
 * It would also become a basic HTTP web server replacing the role of something more traditional like Apache
 */

// import express, mongoose and middleware
const express = require('express')
const mongoose = require('mongoose')
const errorMiddleware = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const Grid = require('gridfs-stream')

// load env variables
const dotenv = require('dotenv').config()
const port = process.env.PORT

let gfs, gridfsBucket

// connect database
connectDB()

const conn = mongoose.connection
conn.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName:'photos'
  })
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('photos')
})

// create express app
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// setup routes to mongodb
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/results', require('./routes/resultRoutes'))
app.use('/api/events', require('./routes/eventRoutes'))

// route for seeing screenshot
app.get('/api/results/file/:filename',async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridfsBucket.openDownloadStreamByName(file.filename)
    readStream.pipe(res);
  } catch (error) {
    console.log(error)
    res.send("not found");
  }
})

// use error handling middleware last
app.use(errorMiddleware.errorHandler)

// start backend
app.listen(port, () => { console.log(`Server started on port ${port}`) })