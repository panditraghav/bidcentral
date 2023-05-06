const mongoose = require("mongoose");

const schema = mongoose.Schema({
  asset: {
    type: mongoose.Schema.ObjectId,
    ref: "Asset",
    required: [true, "A bid should have an asset"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A bid should have an user"],
  },
  amount: {
    type: Number,
    required: [true, "A bid should have an amount"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Bid = mongoose.model("Bids", schema);
module.exports = Bid;
