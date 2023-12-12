const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (err) {
      throw new Error("Not Authorised, Please Login Again");
    }
  } else {
    throw new Error("There is no token attached to the header..");
  }
});

const restrictTo = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      throw new Error("You are not Authorized");
    } else {
      next();
    }
  });
};

module.exports = { authMiddleware, restrictTo };
