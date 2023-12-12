const { generaterToken } = require("../config/jwtToken");
const { validateMongodbId } = require("../config/validateMongoDbId");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const sendEmail = require("./emailCtrl");
const { getPasswordResetEmailContent } = require("../utils/emailContent");

// CREATE A USER
const registerAUser = asyncHandler(async (req, res) => {
  // Get the email from req.body and find whether a user with this email exists or not
  const email = req.body.email;

  // FIND THE USER WITH THIS EMAIL
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // CREATE A USER
    const createUser = await User.create(req.body);
    res.status(200).json({
      status: true,
      message: "User Created Successfully",
      createUser,
    });
  } else {
    throw new Error("User Already Exists!");
  }
});

//Login User

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Fixed typo here: 'passowrd' -> 'password'
  // Check if user exists or not
  const findUser = await User.findOne({ email: email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.status(200).json({
      status: true,
      message: "Logged In Successfully",
      token: generaterToken(findUser?._id),
      role: findUser?.roles,
      username: findUser?.firstname + " " + findUser?.lastname,
      user_image: findUser?.user_image,
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//Get All User

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({
      status: true,
      message: "All user fetched sucessfully",
      allUsers,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
});

//Get A User

const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getaUser = await User.findById(id);
    res.status(200).json({
      status: true,
      message: "User Fetched Successfully",
      getaUser,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
});

//Update the User Profile

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
    res
      .status(200)
      .json({ status: true, message: "Profile Updated Successfully!", user });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
});

//Update A Password

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  try {
    const user = await User.findById(_id);
    if (user && (await user.isPasswordMatched(password))) {
      throw new Error("Please Provide a New Password Instead Of Old One.");
    } else {
      user.password = password;
      await user.save();
      res
        .status(200)
        .json({ status: true, message: "Password Updated Successfully" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

//Forgot The Password
const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("User Not Exists with this email");
  }
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetlink = `http://localhost:4000/api/user/reset-password/${token}`;
    const emailContent = getPasswordResetEmailContent(user, resetlink); // Call the function

    const data = {
      to: email,
      subject: "Password Reset Request",
      html: emailContent,
    };

    sendEmail(data);
    res.status(200).json({
      message: "Password reset link has been sent to your email",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error("Token Expired, Please try again");
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.status(200).json({
    status: true,
    message: " Password Reset Successfully",
  });
});

//Block A User

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "User Is Blocked",
      block,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Unblock A User

const unBlockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const unBlock = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "User Unblocked Successfully",
      unBlock,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Deleting The User Profile

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "User Is Successfully Deleted!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  registerAUser,
  loginUser,
  getAllUser,
  getAUser,
  updateUser,
  deleteUser,
  blockUser,
  unBlockUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
};
