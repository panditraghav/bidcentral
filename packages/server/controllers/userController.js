const factory = require("./handlerFactory");
const User = require("../models/userModel");

// Reusing code from the handlerFactory file
exports.createUser = async (req, res) => {
  try {
    // Doing this way to avoid someone providing role='admin'
    // console.log(req.body);
    const body = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
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
