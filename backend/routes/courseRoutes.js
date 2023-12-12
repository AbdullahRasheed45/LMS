const {
  createCourse,
  getAllCourses,
  getACourse,
  updateCourse,
  deleteCourse,
  getParticularInstructorCourses,
  checkEnrollment,
  freeEnrollment,
} = require("../controllers/courseCtrl");
const {
  createLesson,
  deleteALesson,
  getAlesson,
  getAllCourselesson,
  updateLesson,
} = require("../controllers/lessonCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const courseRouter = require("express").Router();

courseRouter.post(
  "/",
  authMiddleware,
  restrictTo("admin", "instructor"),
  createCourse
);
courseRouter.get("/all", getAllCourses);
courseRouter.get("/:slug", getACourse);
courseRouter.get(
  "/instructor/all-courses",
  authMiddleware,
  restrictTo("admin", "instructor"),
  getParticularInstructorCourses
);
courseRouter.put(
  "/:id",
  authMiddleware,
  restrictTo("admin", "instructor"),
  updateCourse
);
courseRouter.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "instructor"),
  deleteCourse
);

//=================================Lesson==============================//

courseRouter.post(
  "/lesson/:courseId",
  authMiddleware,
  restrictTo("admin", "instructor"),
  createLesson
);
courseRouter.put(
  "/lesson/:courseId/:lessonId", // Fixed missing slash here
  authMiddleware,
  restrictTo("admin", "instructor"),
  deleteALesson
);
courseRouter.get(
  "/lesson/:lessonId", // Fixed missing slash here
  authMiddleware,
  restrictTo("admin", "instructor"),
  getAlesson
);
courseRouter.get(
  "/lessons/:courseId",
  authMiddleware,
  restrictTo("admin", "instructor"),
  getAllCourselesson
);
courseRouter.put(
  "/lesson/:lessonId",
  authMiddleware,
  restrictTo("admin", "instructor"),
  updateLesson
);

courseRouter.post(
  "/check-enrollment/:courseId",
  authMiddleware,
  checkEnrollment
);
courseRouter.post("/free-enrollment/:courseId", authMiddleware, freeEnrollment);

module.exports = courseRouter;
