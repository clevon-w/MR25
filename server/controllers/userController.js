/**
 * Controller for the users collection.
 * Contains the CRUD functions that can be called on the users collection.
 */

 const User = require("../models/userModel")
 const jwt = require('jsonwebtoken')
 const bcrypt = require('bcryptjs')
 const asyncHandler = require('express-async-handler')
 
 /**
  * findUsers gets the entire collection of users.
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
 exports.findUsers = asyncHandler(async (req, res) => {
   const users = await User.find()
   res.send({ data: users })
 })
 
 /**
  * getMe gets the user data.
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
  exports.getMe = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user.id)
   res.status(200).send({ data: user })
 })
 
 /**
  * createUser creates a user and saves it into the users collection.
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
 exports.createUser = asyncHandler(async (req, res) => {
   const {firstName, lastName, email, gender, birthDate, nric, password} = req.body
   
   // Check if all fields are defined
   if (!firstName || !lastName || !email || !gender || !birthDate || !nric || !password) {
     res.status(400)
     throw new Error('Please add all fields')
   }
   
   // Check if user exists
   const userExists = await User.findOne({ email })
   if (userExists) {
     res.status(400)
     throw new Error('User already exists')
   }
 
   // Hash password
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, salt)
 
   // Create user
   const user = await User.create({
     firstName,
     lastName,
     email,
     gender,
     birthDate,
     nric,
     password: hashedPassword
   })
   
   if (user) {
     res.status(201)
       .send({ 
         data: user, 
         token: generateToken(user._id)
       })
   } else {
     res.status(400)
     throw new Error('Invalid user data')
   }
 })
 
 /**
  * updateUser updates a user in the collection by id.
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
 exports.updateUser = asyncHandler(async (req, res) => {
   try {
     const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
     res.send({data: user})
   } catch {
     res.status(404)
     throw new Error('User is not found')
   }
 })
 
 /**
  * deleteUser deletes a user from the collection by id.
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
 exports.deleteUser = asyncHandler(async (req, res) => {
   try {
     const user = await User.findByIdAndDelete(req.params.id)
     res.send({data: true})
   } catch {
     res.status(404)
     throw new Error('User is not found')
   }
 })
 
 /**
  * loginUser authenticates a user
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
 exports.loginUser = asyncHandler(async (req, res) => {
   const {email, password} = req.body
 
   // Check for user email
   const user = await User.findOne({email})
 
   if (user && (await bcrypt.compare(password, user.password))) {
     res.send({
       data: user,
       token: generateToken(user._id)
     })
   } else {
     res.status(400)
     throw new Error('Invalid credentials')
   }
 })
 
 // Generate JWT
 const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
 }