/**
 * Controller for the events collection.
 * Contains the CRUD functions that can be called on the users collection.
 */

 const req = require('express/lib/request')
 const User = require("../models/userModel")
 const Event = require('../models/eventModel')
 const asyncHandler = require('express-async-handler')
 
 /**
  * findEvents gets the entire collection of Events.
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
 exports.findEvents = asyncHandler(async (req, res) => {
   const events = await Event.find()
   res.send({data: events})
 })
 
 /**
  * createUser creates a user and saves it into the users collection.
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
  * findUser gets a user by id from a collection.
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
 exports.findEvent = asyncHandler(async (req, res) => {
   try {
     const event = await Event.findById(req.params.id)
     res.send({data: event})
   } catch {
     res.status(404)
     throw new Error('Event is not found')
   }
 })
 
 /**
  * updateUser updates a user in the collection by id.
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
 exports.updateEvent = asyncHandler(async (req, res) => {
   try {
     const event = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true})
     res.send({data: event})
   } catch {
     res.status(404)
     throw new Error('Event is not found')
   }
 })
 
 /**
  * deleteUsers deletes a user from the collection by id.
  * 
  * @param {*} req the object containing information about the HTTP request that raised the event
  * @param {*} res the object to send back to the desired HTTP response
  */
 exports.deleteEvent = asyncHandler(async (req, res) => {
   try {
     const event = await Event.findById(req.params.id)
     if(!event){
       res.status(400)
       throw new Error('event not found')
     }

     await event.remove()

     res.status(200).json({id: req.params.id})
   } catch {
     res.status(404)
     throw new Error('Event is not found')
   }
 })