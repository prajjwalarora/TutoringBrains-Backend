const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const filter = require("../utils/filter");
// const factory = require("./handlerFactory");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, status, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 100
    ),
    // httpOnly: true,
    // secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  user.password = undefined;

  res.status(201).json({
    status: "success",
    data: {
      token,
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  createSendToken(newUser, 201, req, res);
});

exports.login = async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide email and password!", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401));
  }
  createSendToken(user, 200, req, res);
};
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
  });
};
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token || token === "null") {
    if (!req.headers["user-agent"].includes("PostmanRuntime"))
      return res.status(401).json({
        status: "error",
        message: "Please Login to perform this action!",
      });
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does not longer exists.",
        401
      )
    );
  }
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError("User recently changed password! Please login again", 401)
  //   );
  // }
  res.locals.user = currentUser;
  req.user = currentUser;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.headers["authorization"].split(" ")[1],
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return next();
      }
      // if (currentUser.changedPasswordAfter(decoded.iat)) {
      //   return next();
      // }

      // if (!currentUser.emailVerified) {
      //   return next(
      //     new AppError("Please First verify your email address!", 401)
      //   );
      // }

      res.locals.user = currentUser;
      return next();
    } catch (err) {
      console.log(err);
      return next();
    }
  }
  next();
};

exports.saveuserImage = async function (req, res, next) {
  const { userId, image } = req.body;
  // console.log(userId);
  // console.log(image);
  var base64Data = image.replace(/^data:image\/jpeg;base64,/, "");

  require("fs").writeFile(
    `${userId}.jpeg`,
    base64Data,
    "base64",
    function (err) {
      console.log(err);
    }
  );
  res.status(200);
};

exports.windowSwitchInfo = async function (req, res, next) {
  console.log("window Switched");
  res.status(200);
};

exports.verifyDeviceRegisterBody = (req, res, next) => {
  next();
};

exports.registerDevice = catchAsync(async (req, res, next) => {
  const { deviceFingerprint } = req.body;
  if (!deviceFingerprint || deviceFingerprint.length === 0) {
    return next(new AppError("device fingerprint missing.", 400));
  }

  const filteredBody = filter.filterObj(req.body, "deviceFingerprint");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
