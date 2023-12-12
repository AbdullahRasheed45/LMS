const { default: slugify } = require("slugify");
const Video = require("../models/videoModels");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../config/validateMongoDbId");

// CREATE OR POST THE VIDEO

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

// GET A VIDEO

const getSingleVideo = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const video = await Video.findOne({ slug: slug });
    res.status(200).json({
      status: true,
      message: "Video found!",
      video,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// GET ALL VIDEOS

const getAllVideos = asyncHandler(async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json({
      status: true,
      message: "Videos Found Successfully!",
      videos, // You might want to send the list of videos here
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

// UPDATE A VIDEO

const updateVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const update = await Video.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      status: true,
      message: "Video Updated Successfully!",
      update,
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
