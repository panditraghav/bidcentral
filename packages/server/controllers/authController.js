const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET);
};

// Function for logging in user or admin
exports.login = async (req, res, next) => {
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
