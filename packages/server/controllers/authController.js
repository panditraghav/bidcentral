const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET);
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    // secure: req.secure || req.headers('x-forwaded-proto') === 'https', // cookie will only be sent when https
    httpOnly: true, // cookie cannot be manipulated
  });

  user.password = undefined;

  res.status(200).json({
    status: "success",
    token: token,
    data: {
      user: user,
    },
  });
};

exports.signup = async (req, res, next) => {
  //   const newUser = await User.create(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  // const url = `${req.protocol}://${req.get("host")}/me`;
  // await new Email(newUser, url).sendWelcome();
  createSendToken(newUser, 201, req, res);
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
  createSendToken(user, 200, req, res);
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      res.status(401).send();
      return next(
        new Error("You are not logged in, please login to get access")
      );
    }

    // Verify the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded);

    // check if user exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      res.status(401).send();
      return next(new Error("User does not exist"));
    }

    //  Grant access
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (err) {
    console.log(err.message);
  }
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    // console.log(res.cookies);
    if (req.cookies.jwt) {
      // 1)Verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 3) check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      // 3) check if user changed password after jwt was issued
      // if (await currentUser.changedPasswordAfter(decoded.iat)) {
      //   return next();
      // }

      // There is a logged in user

      // res.locals is available in all the templates.
      // passing data into the template in a render function.
      res.locals.user = currentUser;
      return next();
    }
  } catch (err) {
    return next();
  }

  next();
};
