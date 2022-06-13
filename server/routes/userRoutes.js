const express = require("express");
const router = express.Router();

// import controller
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// setup routes
router.route("/").get(userController.findUsers).post(userController.createUser);
router.patch("/updatePasswordViaEmail", userController.updatePassword);
router.post("/login", userController.loginUser);
router.get("/me", protect, userController.getMe);
router.post("/forgetPassword", userController.forgetPassword);
router.get("/reset/:token", userController.authenticateResetPassword);

router
  .route("/:id")
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
