//import express and controller
const express = require ('express')
const router = express.Router()

//import controller
const eventController = require('../controllers/eventController')
const { protect } = require('../middleware/authMiddleware')

//set up routes
router.route('/')
      .get(eventController.findAllEvents)
      .post(protect, eventController.createEvent)

router.route('/:id')
      .get(protect, eventController.findUserEvents)
      .patch(protect, eventController.updateEvent)
      .delete(protect, eventController.deleteEvent)

module.exports = router
