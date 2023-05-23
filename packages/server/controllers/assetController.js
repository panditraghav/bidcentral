const stripe = require("stripe")(
  "sk_test_51N7lzOSAja2NO5MHUxJmlhja5rnFCHzbezupTpXTzhrD0i2aMGwOs2jLENpVI9QtVkTcdbsIlOI3aUKNQa9g43PL002SyBTg1X"
);
const Asset = require("../models/assetModel");
const User = require("../models/userModel");
const factory = require("./handlerFactory");

exports.getCheckoutSession = async (req, res, next) => {
  try {
    const amount = Number(req.params.amount);
    console.log(amount);

    const user = req.user;
    user.credit += amount;
    await user.save();

    // 2) Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${req.get("origin")}`,
      cancel_url: `${req.get("origin")}`,
      customer_email: req.user.email,
      // client_reference_id: req.params.assetId,
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "inr",
            unit_amount: Number(amount) * 100,
            product_data: {
              name: "Credits",
              description: "Just pay and you are ready to go",
              // images:
            },
          },
        },
      ],
    });
    // 3) Create session as response
    res.status(200).json({
      status: "success",
      session,
    });
  } catch (err) {
    console.log(err);
  }

  // res.status(200).redirect(session.url);
};

// exports.creditsCheckout = async (req, res, next) => {
//   try {
//     const { userId, amount } = req.query;
//     const amount = console.log(req.query);

//     if (!userId && !amount) {
//       return next();
//     }

//     const user = await User.findById(userId);

//     user.credit = user.credit + amount;
//     await user.save();
//     res.redirect(req.originalUrl.split("?")[0]);
//     res.redirect("http://localhost:5173");
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.createAsset = async (req, res) => {
  try {
    const body = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      // bidClosedAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      bidClosedAt: req.body.bidClosedAt,
      currentBid: 0,
      image: req.body.image,
    };

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

// this should be a patch req
exports.createBid = async (req, res) => {
  try {
    // this is authenticated route
    // console.log(req.user);
    const user = req.user;
    const assetId = req.body.asset;
    const amount = req.body.amount;

    const asset = await Asset.findById(assetId);

    // update the values of the bids(array) with user(slug) and amount
    const bodyForAsset = {
      user: user.slug,
      amount,
    };

    const bodyForUser = {
      asset: asset.slug,
      amount,
    };

    // Updating the bids[] for asset
    const userBidIndex = asset.bids.findIndex((bid) => {
      return bid.user === user.slug;
    });

    // If user have already made a bid, update that bid with new amount else make a new bid
    if (userBidIndex !== -1) {
      // console.log(await Asset.updateOne(
      //     { id: assetId , "bids.user": user.slug},
      //     { "bids.$.amount": amount, $set: { currentBid: amount } }
      // ));
      asset.bids[userBidIndex].amount = amount;
    } else {
      asset.bids.push(bodyForAsset);
      // console.log(await Asset.updateOne(
      //     { id: assetId },
      //     { $push: updatedObj, $set: { currentBid: amount } }
      // ));
    }
    asset.currentBid = amount;
    await asset.save();

    // Updating the bids[] for user
    const assetBidIndex = user.bids.findIndex((bid) => {
      return bid.asset === asset.slug;
    });

    if (assetBidIndex !== -1) {
      user.bids[assetBidIndex].amount = amount;
    } else {
      user.bids.push(bodyForUser);
    }

    user.credit = user.credit - amount;

    await user.save();

    res.send("done");
  } catch (err) {
    console.log(err.message);
  }
};

exports.getAllAssets = factory.getAllDocuments(Asset);

exports.getAsset = factory.getDocument(Asset);
