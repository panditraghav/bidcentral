const express = require("express");
const assetController = require("../controllers/assetController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(assetController.getAllAssets)
  .post(assetController.createAsset);

router.route("/:slug").get(assetController.getAsset);
router.post("/bid", authController.protect, assetController.createBid);

router.get(
  "/checkout-session/:assetId",
  authController.protect,
  assetController.getCheckoutSession
);

// router.route("/:id").get(assetController.getAsset);

module.exports = router;
