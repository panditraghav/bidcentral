const factory = require("./handlerFactory");
const User = require("../models/userModel");

exports.transferCredit = async (req, res) => {
  try {
    const amount = Number(req.params.amount);
    const user = req.user;
    if (user.credit < amount) {
      res.status(400).json({
        status: "Failed",
        message: "You cannot transfer more than your credits",
      });
    }

    user.credit -= amount;
    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Credits transfer successful",
    });
  } catch (err) {
    console.log(err);
  }
};

// Reusing code from the handlerFactory file
exports.createUser = async (req, res) => {
  try {
    // Doing this way to avoid someone providing role='admin'
    // console.log(req.body);
    const body = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      photo: req.body.photo,
    };

    // Create user from body
    const doc = await User.create(body);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      doc,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = factory.getDocument(User);

exports.getAllUsers = factory.getAllDocuments(User);

// exports.updateUser = factory.updateDocument();
