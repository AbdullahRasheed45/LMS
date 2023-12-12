const googleRouter = require("express").Router();
const passport = require("passport");
const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");

googleRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

googleRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/success",
    failureRedirect: "/auth/failure",
  })
);

googleRouter.get(
  "/auth/success",
  expressAsyncHandler(async (req, res) => {
    console.log("success");
    res.status(200).json({ status: true, message: "login success", user: req.user });
  })
);

googleRouter.get(
  "/auth/failure",
  expressAsyncHandler(async (req, res) => {
    res.status(401).json({ status: false, message: "login failed" });
  })
);

googleRouter.get(
  "/logout",
  expressAsyncHandler(async (req, res) => {
    req.logOut();
    res.redirect("/");
  })
);

module.exports = googleRouter;
