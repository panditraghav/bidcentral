const mongoose = require("mongoose");
const slugifiy = require("slugify");

const assetSchema = mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  price: Number,
  bidOpenedAt: {
    type: Date,
    default: Date.now(),
  },
  bidClosedAt: Date,
  image: String,

  bids: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Bid",
    },
  ],
});

assetSchema.pre("save", function (next) {
  this.slug = slugifiy(this.title, { lower: true });
  next();
});

const Asset = mongoose.model("Assets", assetSchema);
module.exports = Asset;
