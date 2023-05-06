const express = require("express");
const assetController = require("../controllers/assetController");
const router = express.Router();

router
  .route("/")
  .get(assetController.getAllAssets)
  .post(assetController.createAsset);

router.route("/:slug").get(assetController.getAsset);

module.exports = router;
