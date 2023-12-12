const { default: slugify } = require("slugify");
const Course = require("../models/courseCategoryModel");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../config/validateMongoDbId");

// CREATE OR POST THE Course

const postCourse = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const newCourse = await Course.create(req.body);
    res.status(200).json({
      status: true,
      message: "New Course Created Successfully!",
      newCourse,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// GET A Course

const getSingleCourse = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const course = await Course.findOne({ slug : slug });
    res.status(200).json({
      status: true,
      message: "Course found!",
      course,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// GET ALL Courses

const getAllCourses = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      status: true,
      message: "Courses Found Successfully!",
      courses,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE Course

const deleteACourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteCourse = await Course.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Course Deleted Successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// UPDATE A Course

const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      status: true,
      message: "Course Updated Successfully!",
      updatedCourse,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  postCourse,
  getAllCourses,
  getSingleCourse,
  deleteACourse,
  updateCourse,
};
