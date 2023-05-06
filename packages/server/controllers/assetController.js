const Asset = require("../models/assetModel");
const factory = require("./handlerFactory");

exports.createAsset = async (req, res) => {
  try {
    const body = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    };
    console.log("Inside controller");

    const asset = await Asset.create(body);

    res.status(201).json({
      status: "success",
      message: "Asset created successfully",
      asset,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllAssets = factory.getAllDocuments(Asset);

exports.getAsset = factory.getDocument(Asset);
