const Course = require("../models/courseModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { default: slugify } = require("slugify");
const { validateMongodbId } = require("../config/validateMongoDbId");

//Create A Course

const createCourse = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    if (_id) {
      req.body.instructor = _id;
    }
    const course = await Course.create(req.body);
    res.status(200).json({
      status: true,
      message: "Course Created Succesfully!",
      course,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Get All COurses
const getAllCourses = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      status: true,
      message: "All Courses are Fetched Successfully!",
      courses,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getParticularInstructorCourses = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const courses = await Course.find({ instructor: _id });
    res.status(200).json({
      status: true,
      message: "Course Fetched for Particular Instructor Successfully!",
      courses,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//GET A Course

const getACourse = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const course = await Course.findOne({ slug: slug });
    res.status(200).json({
      status: true,
      message: "Course is Fetched",
      course,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      status: true,
      message: "Course Updated Succesfully",
      course,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const course = await Course.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Course Deleted Succesfully",
      course,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const checkEnrollment = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    let ids = [];
    for (let i = 0; i < user.courses.length; i++) {
      if (user.courses.length > 0) {
        ids.push(user.courses[i].toString());
      }
    }
    res.status(200).json({
      status: ids.includes(courseId),
      course: await Course.findById(courseId).exec(),
    });
  } catch (error) {
    throw new Error(error);
  }
});

const freeEnrollment = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (course.paid) {
      return;
    }
    const addCourseToUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          courses: course?._id,
        },
      },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Course Added",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  getACourse,
  getParticularInstructorCourses,
  checkEnrollment,
  freeEnrollment,
};
