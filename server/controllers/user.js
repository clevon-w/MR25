/**
 * Controller for the users collection.
 * Contains the CRUD functions that can be called on the users collection.
 */

const User = require("../models/User")

/**
 * findUsers gets the entire collection of users.
 * 
 * @param {*} req the object containing information about the HTTP request that raised the event
 * @param {*} res the object to send back to the desired HTTP response
 */
exports.findUsers = async (req, res) => {
  const users = await User.find()
  res.send({data: users})
}

/**
 * createUser creates a user and saves it into the users collection.
 * 
 * @param {*} req the object containing information about the HTTP request that raised the event
 * @param {*} res the object to send back to the desired HTTP response
 */
exports.createUser = async (req, res) => {
  const user = new User(req.body)
  await user.save()
  res.send({data: user})
}

/**
 * findUser gets a user by id from a collection.
 * 
 * @param {*} req the object containing information about the HTTP request that raised the event
 * @param {*} res the object to send back to the desired HTTP response
 */
exports.findUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.send({data: user})
  } catch {
    res.status(404).send({error: "User is not found!"})
  }
}

/**
 * updateUser updates a user in the collection by id.
 * 
 * @param {*} req the object containing information about the HTTP request that raised the event
 * @param {*} res the object to send back to the desired HTTP response
 */
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    Object.assign(user, req.body)
    await user.save()
    res.send({data: user})
  } catch {
    res.status(404).send({error: "User is not found!"})
  }
}

/**
 * deleteUsers deletes a user from the collection by id.
 * 
 * @param {*} req the object containing information about the HTTP request that raised the event
 * @param {*} res the object to send back to the desired HTTP response
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    await user.remove()
    res.send({data: true})
  } catch {
    res.status(404).send({error: "User is not found!"})
  }
}