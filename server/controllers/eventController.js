/**
 * Controller for the events collection.
 * Contains the CRUD functions that can be called on the users collection.
 */

// const req = require('express/lib/request')
const User = require("../models/userModel")
const Event = require('../models/eventModel')
const asyncHandler = require('express-async-handler')

/**
  * findAllEvents gets the entire collection of events.
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
  const { name, } = req.body

  if (!name) {
    res.status(400)
    throw new Error('Please add an event')
  }

  const event = await Event.create({
    name: req.body.name,
  })

  res.status(200).json(event)
})

/**
  * updateEvent updates an event in the collection.
  * Protected to the user
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
exports.updateEvent = asyncHandler(async (req, res) => {
  // Get the event
  const event = await Event.findById(req.params.id)

  // Check if event exists
  if (!event) {
  res.status(400)
  throw new Error('event not found')
  }

  const updatedevent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.send({data: updatedevent})
})
 
/**
  * deleteEvent deletes an event from the collection.
  * Protected to the user.
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
exports.deleteEvent = asyncHandler(async (req, res) => {
  // Get the event
  const event = await Event.findById(req.params.id)
  const user = await User.findById(req.user.id)

  // Check if event exists
  if (!event) {
    res.status(400)
    throw new Error('event not found')
  }

  await event.remove()

  res.status(200).json({id: req.params.id})
})