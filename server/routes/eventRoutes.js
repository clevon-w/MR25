//import express and controller
const express = require ('express')
const router = express.Router()

//import controller
const {findEvents, createEvent, findEvent, updateEvent,deleteEvent} = require('../controllers/eventController')
const { protect } = require('../middleware/authMiddleware')

//set up routes
router.route('/')
      .get(findEvents)
      .post(protect, createEvent)

router.route('/:id')
      .get(protect, findEvent)
      .patch(protect, updateEvent)
      .delete(protect, deleteEvent)

module.exports = router
