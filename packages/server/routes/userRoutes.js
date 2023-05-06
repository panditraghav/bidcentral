const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

////////////////////////////////////////////////////////////
// This is non-protected route, so that anyone with credentials can login
router.post("/login", authController.login);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")

  .get(userController.getUser);
//   .get(authController.protect, userController.getUser)

// .patch(userController.updateUser);
//   .patch(authController.protect, userController.updateUser);

module.exports = router;
