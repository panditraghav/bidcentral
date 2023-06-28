const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

////////////////////////////////////////////////////////////
// This is non-protected route, so that anyone with credentials can login
router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.get("/auth", authController.protect, (req, res) =>
  res.json({
    userId: req.user.id,
    name: req.user.name,
    slug: req.user.slug,
    role: req.user.role,
    credit: req.user.credit,
  })
);
router.get("/logout", authController.logout);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")

  .get(userController.getUser);

router.get(
  "/transfer-credit/:amount",
  authController.protect,
  userController.transferCredit
);
//   .get(authController.protect, userController.getUser)

// .patch(userController.updateUser);
//   .patch(authController.protect, userController.updateUser);

// router.get(
//   "/updateCredit/:amount",
//   authController.protect,
//   assetController.creditsCheckout
// );

module.exports = router;
