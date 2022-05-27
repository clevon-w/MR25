/**
 * Controller for the results collection.
 * Contains the CRUD functions that can be called on the users collection.
 */

// const req = require('express/lib/request')
const User = require("../models/userModel")
const Result = require('../models/resultModel')
const asyncHandler = require('express-async-handler')

/**
  * findAllResults gets the entire collection of Results.
  * It is not protected.
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
exports.findAllResults = asyncHandler(async (req, res) => {
  const results = await Result.find()
  res.send(results)
})

/**
  * createResult creates an result and saves it into the results collection.
  * Protected to the user.
  * 
  * @param {*} req the object containing information about the HTTP request that raised the result
  * @param {*} res the object to send back to the desired HTTP response
  */
exports.createResult = asyncHandler(async (req, res) => {
  const {userId, eventId, firstName, lastName, runTiming, ageCategory, institution, screenshot, verified} = req.body

  if (!ageCategory || !runTiming || !institution || !screenshot) {
    res.status(400)
    throw new Error('Please input all fields and select a file')
  }

  // req.user is put in by authMiddleware because of the authentication token
  // we dont have a eventMiddleware to get the event entry
  // so we are just hardcoding the eventId in for now
  const result = await Result.create({
    userId: userId,
    eventId: eventId,
    firstName: firstName,
    lastName: lastName,
    institution: institution,
    ageCategory: ageCategory,
    runTiming: runTiming,
    runDistance,
    runDate,
    screenshot: `http://localhost:8000/api/results/file/${screenshot.filename}`,
    verified: verified,
  })

  res.status(200).json(result)
})

/**
* findUserResults gets the results of a user.
* 
* @param {*} req the object containing information about the HTTP request that raised the event
* @param {*} res the object to send back to the desired HTTP response
*/
exports.findUserResults = asyncHandler(async (req, res) => {
  try {
    const result = await Result.find({ user: req.user.id })
    res.send({ data: result })
  } catch {
    res.status(404)
    throw new Error('Results is not found')
  }
})

/**
  * updateResult updates an result in the collection.
  * Protected to the user
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
exports.updateResult = asyncHandler(async (req, res) => {
  // Get the user and the result
  const result = await Result.findById(req.params.id)

  // Check if result exists
  if (!result) {
  res.status(400)
  throw new Error('Result not found')
  }

  // Check if user exists
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the login user matches the result user
  if (result.user.toString() != req.user.id) {
    res.status(401)
    throw new Error('User not authorised')
  }

  const updatedResult = await Result.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.send({data: updatedResult})
})
 
/**
  * deleteResult deletes an result from the collection.
  * Protected to the user.
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
exports.deleteResult = asyncHandler(async (req, res) => {
  // Get the user and the result
  const result = await Result.findById(req.params.id)

  // Check if result exists
  if (!result) {
    res.status(400)
    throw new Error('Result not found')
  }

  // Check if user exists
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the login user matches the result user
  if (result.user.toString() != req.user.id) {
    res.status(401)
    throw new Error('User not authorised')
  }
  await result.remove()

  res.status(200).json({id: req.params.id})
})