const express = require("express");
const router = express.Router();

// import controller
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// setup routes
router.route("/").get(userController.findUsers).post(userController.createUser);

router
  .route("/:id")
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.post("/login", userController.loginUser);
router.get("/me", protect, userController.getMe);
router.post("/forgetpassword", userController.forgetPassword);
router.get("/reset/:token", userController.authenticateResetPassword);
router.patch("/updatePasswordViaEmail", userController.updatePassword);

module.exports = router;
