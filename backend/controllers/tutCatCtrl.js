const { default: slugify } = require("slugify");
const TutorialCategory = require("../models/tutCategoryModel");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../config/validateMongoDbId");

const postTutorialCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const postTutCat = await TutorialCategory.create(req.body);
    res.status(200).json({
      status: true,
      message: "Tutorial Category Created Successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllTutCategories = asyncHandler(async (req, res) => {
  try {
    const getAllCategories = await TutorialCategory.find();
    res.status(200).json({
      status: true,
      message: "All Tutorials fetched successfully!",
      getAllCategories,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getATutCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getATut = await TutorialCategory.findById(id);
    res.status(200).json({
      status: true,
      message: "Tutorial Data is Fetched Successfully!",
      getATut,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteATutCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteATut = await TutorialCategory.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Tutorial Category Deleted Successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateATutCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updateATut = await TutorialCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Tutorial Category Updated Successfully!",
      updateATut,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  postTutorialCategory,
  getAllTutCategories,
  getATutCategory,
  deleteATutCategory,
  updateATutCategory,
};
