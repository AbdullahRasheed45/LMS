const {
  postCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteACourse,
} = require("../controllers/courseCategoryCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const courseCatRouter = require("express").Router();

courseCatRouter.post("/", authMiddleware, restrictTo("admin"), postCourse);
courseCatRouter.get("/all", getAllCourses);
courseCatRouter.get(
  "/:slug",
  authMiddleware,
  restrictTo("admin", "instructor"),
  getSingleCourse
);
courseCatRouter.put(
  "/:id",
  authMiddleware,
  restrictTo("admin", "instructor"),
  updateCourse
);
courseCatRouter.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "instructor"),
  deleteACourse
);

module.exports = courseCatRouter;
