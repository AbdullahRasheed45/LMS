const { validateMongodbId } = require("../config/validateMongoDbId");
const Review = require("../models/reviewModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//CREATE REVIEW

const createReview = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    let data = { user: _id, comment: req.body.comment, color: req.body.color };
    const newReview = await Review.create(data);
    res.status(200).json({
      status: true,
      message: "New Review is Created",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllReview = asyncHandler(async (req, res) => {
  try {
    const allReviews = await Review.find().populate("user");;
    res.status(200).json({
      status: true,
      message: "Reviews Fetched Successfully!",
      allReviews,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const review = await Review.findById(id).populate("user");
    res.status(200).json({
      status: true,
      message: "Review Fetched Successfully!",
      review,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteReview = await Review.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Reviews Deleted Successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateReviewStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updateStatus = await Review.findByIdAndUpdate(
      id,
      { isApprove: req.body.isApproved },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Reviews Deleted Successfully!",
      updateStatus,
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createReview,
  getAllReview,
  getAReview,
  deleteAReview,
  updateReviewStatus,
};
