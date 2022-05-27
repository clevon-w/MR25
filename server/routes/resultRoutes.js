//import express and controller
const express = require ('express')
const router = express.Router()

//import controller
const resultController = require('../controllers/resultController')
const { protect } = require('../middleware/authMiddleware')
const { upload } = require('../middleware/uploadMiddleware')

//set up routes
router.route('/')
      .get(resultController.findAllResults)
      .post(resultController.createResult)

router.route('/:id')
      .get(protect, resultController.findUserResults)
      .patch(protect, resultController.updateResult)
      .delete(protect, resultController.deleteResult)

module.exports = router
