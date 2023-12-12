const Lesson = require("../models/lessonModel");
const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const { default: slugify } = require("slugify");
const { validateMongodbId } = require("../config/validateMongoDbId");

const createLesson = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  try {
    const findCourse = await Course.findById(courseId);
    if (findCourse) {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const lesson = await Lesson.create(req.body);
      await Course.findByIdAndUpdate(
        courseId,
        { $push: { lessons: lesson._id } },
        { new: true }
      );
      res.status(200).json({
        status: true,
        message: "Lesson is Created",
        lesson,
      });
    } else {
      throw new Error("No Course Exists with this ID");
    }
  } catch (error) {
    throw error;
  }
});

const deleteALesson = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.params; // Fixed typo here
  validateMongodbId(courseId);
  validateMongodbId(lessonId); // Fixed typo here
  try {
    const findCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { lessons: lessonId } }, // Fixed typo here
      { new: true }
    );
    const findLesson = await Lesson.findByIdAndDelete(lessonId); // Fixed typo here
    res.status(200).json({
      status: true,
      message: "Course and Lesson Deleted Successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAlesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params; // Fixed typo here
  validateMongodbId(lessonId);
  try {
    const lesson = await Lesson.findOne({ _id: lessonId }); // Fixed typo here
    res.status(200).json({
      status: true,
      message: "Lesson Fetched Successfully!", // Fixed typo here
      lesson,
    });
  } catch (error) {
    throw error;
  }
});

const getAllCourselesson = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  validateMongodbId(courseId);
  try {
    const course = await Course.find()
      .where({ _id: courseId })
      .select("lessons"); // Fixed query here
    res.status(200).json({
      status: true,
      message: "All Lessons Fetched Successfully!",
      course, // Fixed response here
    });
  } catch (error) {
    throw error;
  }
});

//UPDATE THE LESSON

const updateLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  validateMongodbId(lessonId);
  try {
    const findandUpdateLesson = await Lesson.findByIdAndUpdate(
      lessonId,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Lessons Updated Successfully!",
      findandUpdateLesson,
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createLesson,
  deleteALesson,
  getAlesson,
  getAllCourselesson,
  updateLesson
};
