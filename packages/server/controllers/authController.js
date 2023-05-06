const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET);
};

// Function for logging in user or admin
exports.login = async (req, res, next) => {
  // console.log(req.headers);
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new Error("Please provide email and password"));
  }

  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email: email }).select("+password");

  if (!user || password !== user.password) {
    return next(new Error("Incorrect email or password"));
  }

  // 3) If all ok, send token to the user
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    token,
  });
};

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new Error("You are not logged in, please login to get access")
      );
    }

    // Verify the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    // check if user exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new Error("User does not exist"));
    }

    //  Grant access
    req.user = currentUser;
    next();
  } catch (err) {
    console.log(err);
  }
};
