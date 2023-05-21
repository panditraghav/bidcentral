const mongoose = require("mongoose");
const slugifiy = require("slugify");

const assetSchema = mongoose.Schema(
  {
    name: String,
    slug: String,
    description: String,
    price: Number,
    bidOpenedAt: {
      type: Date,
      default: Date.now(),
    },
    bidClosedAt: {
      type: Date,
      default: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    image: String,
    currentBid: {
      type: Number,
      default: 0,
    },

    bids: [
      {
        user: String,
        amount: Number,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

assetSchema.virtual("nextBid").get(function () {
  // if (this.currentBid === 0) {
  //   return this.price;
  // }
  return Math.round(this.currentBid * 1.2);
});

assetSchema.pre("save", function (next) {
  // console.log(this);
  this.slug = slugifiy(this.name, { lower: true });
  console.log(this.nextBid);
  next();
});

const Asset = mongoose.model("asset", assetSchema, "asset");
module.exports = Asset;
