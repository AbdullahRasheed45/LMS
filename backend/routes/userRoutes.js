const express = require("express");
const {
  registerAUser,
  loginUser,
  getAllUser,
  updateUser,
  deleteUser,
  getAUser,
  blockUser,
  unBlockUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
} = require("../controllers/userCtrl");
const { restrictTo, authMiddleware } = require("../middlewares/authMiddleware");
const userRouter = express.Router();
const rateLimit = require("../utils/reqLimit");

//All post routes
userRouter.post(
  "/register",
  rateLimit(60 * 60 * 1000, 2, "Secs", 2),
  registerAUser
);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPasswordToken);

//All get routes
userRouter.get("/all-users", restrictTo("admin"), getAllUser);
userRouter.get("/:id", authMiddleware, getAUser);

//Update user profile

userRouter.put("/update-profile", authMiddleware, updateUser);
userRouter.put("/block/:id", authMiddleware, restrictTo("admin"), blockUser);
userRouter.put(
  "/unblock/:id",
  authMiddleware,
  restrictTo("admin"),
  unBlockUser
);
userRouter.put("/update-password", authMiddleware, updatePassword);
userRouter.put("/reset-password/:token", resetPassword);

//Delete A User Profile

userRouter.delete("/:id", authMiddleware, restrictTo("admin"), deleteUser);

module.exports = { userRouter };
