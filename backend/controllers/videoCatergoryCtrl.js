const { default: slugify } = require("slugify");
const Video = require("../models/videoCatergoryModel");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../config/validateMongoDbId");

// CREATE OR POST THE Video

const postVideo = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const newVideo = await Video.create(req.body);
    res.status(200).json({
      status: true,
      message: "New Video Created Successfully!",
      newVideo,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// GET A Video

const getSingleVideo = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const video = await Video.findOne({ slug : slug });
    res.status(200).json({
      status: true,
      message: "Video found!",
      video,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// GET ALL Videos

const getAllVideos = asyncHandler(async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json({
      status: true,
      message: "Videos Found Successfully!",
      videos,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE Video

const deleteAVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteVideo = await Video.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Video Deleted Successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// UPDATE A Video

const updateVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updatedVideo = await Video.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      status: true,
      message: "Video Updated Successfully!",
      updatedVideo,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  postVideo,
  getAllVideos,
  getSingleVideo,
  deleteAVideo,
  updateVideo,
};
