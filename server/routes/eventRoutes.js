//import express and controller
const express = require ('express')
const router = express.Router()

//import controller
const eventController = require('../controllers/eventController')

//set up routes
router.route('/')
      .get(eventController.findAllEvents)
      .post(eventController.createEvent)

router.route('/:id')
      .patch(eventController.updateEvent)
      .delete(eventController.deleteEvent)

module.exports = router
