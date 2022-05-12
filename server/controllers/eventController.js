/**
 * Controller for the events collection.
 * Contains the CRUD functions that can be called on the users collection.
 */

// const req = require('express/lib/request')
const User = require("../models/userModel")
const Event = require('../models/eventModel')
const asyncHandler = require('express-async-handler')

/**
  * findAllEvents gets the entire collection of Events.
  * It is not protected.
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
exports.findAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find()
  res.send({data: events})
})

/**
  * createEvent creates an event and saves it into the events collection.
  * Protected to the user.
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
exports.createEvent = asyncHandler(async (req, res) => {
  const {distance, loops, runDate, runTiming} = req.body

  if (!distance || !loops || !runDate || !runTiming) {
    res.status(400)
    throw new Error('Please add an event')
  }

  const event = await Event.create({
    user: req.user.id,
    distance: req.body.distance,
    loops: req.body.loops,
    runDate: req.body.runDate,
    runTiming: req.body.runTiming,
  })

  res.status(200).json(event)
})

/**
* findUserEvents gets the events of a user.
* 
* @param {*} req the object containing information about the HTTP request that raised the event
* @param {*} res the object to send back to the desired HTTP response
*/
exports.findUserEvents = asyncHandler(async (req, res) => {
  try {
    const event = await Event.find({ user: req.user.id })
    res.send({ data: event })
  } catch {
    res.status(404)
    throw new Error('Event is not found')
  }
})

/**
  * updateEvents updates an event in the collection.
  * Protected to the user
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
exports.updateEvent = asyncHandler(async (req, res) => {
  // Get the user and the event
  const event = await Event.findById(req.params.id)
  const user = await User.findById(req.user.id)

  // Check if event exists
  if (!event) {
  res.status(400)
  throw new Error('Event not found')
  }

  // Check if user exists
  if (!user) {
  res.status(401)
  throw new Error('User not found')
  }

  // Make sure the login user matches the event user
  if (event.user.toString() != user.id) {
  res.status(401)
  throw new Error('User not authorised')
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.send({data: updatedEvent})
})
 
/**
  * deleteEvent deletes an event from the collection.
  * Protected to the user.
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
exports.deleteEvent = asyncHandler(async (req, res) => {
  // Get the user and the event
  const event = await Event.findById(req.params.id)
  const user = await User.findById(req.user.id)

  // Check if event exists
  if (!event) {
    res.status(400)
    throw new Error('event not found')
  }

  // Check if user exists
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the login user matches the event user
  if (event.user.toString() != user.id) {
    res.status(401)
    throw new Error('User not authorised')
  }
  await event.remove()

  res.status(200).json({id: req.params.id})
})