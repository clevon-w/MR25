// import express and router
const express = require('express')
const router = express.Router()

// import controller
const userController = require('../controllers/userController')

// setup routes
router.route('/')
      .get(userController.findUsers)
      .post(userController.createUser)

router.route('/:id')
      .get(userController.findUser)
      .patch(userController.updateUser)
      .delete(userController.deleteUser)

module.exports = router