/**
 * Controller for the users collection.
 * Contains the CRUD functions that can be called on the users collection.
 */

const User = require("../models/userModel")
const asyncHandler = require('express-async-handler')

/**
 * findUsers gets the entire collection of users.
 * 
 * @param {*} req the object containing information about the HTTP request that raised the event
 * @param {*} res the object to send back to the desired HTTP response
 */
exports.findUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.send({data: users})
})

/**
 * createUser creates a user and saves it into the users collection.
 * 
 * @param {*} req the object containing information about the HTTP request that raised the event
 * @param {*} res the object to send back to the desired HTTP response
 */
exports.createUser = asyncHandler(async (req, res) => {
  if (!req.body.username) {
    res.status(400)
    throw new Error('Please add a username')
  }
  const user = new User(req.body)
  await user.save()
  res.send({data: user})
})

/**
 * findUser gets a user by id from a collection.
 * 
 * @param {*} req the object containing information about the HTTP request that raised the event
 * @param {*} res the object to send back to the desired HTTP response
 */
exports.findUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.send({data: user})
  } catch {
    res.status(404)
    throw new Error('User is not found')
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
 * deleteUsers deletes a user from the collection by id.
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