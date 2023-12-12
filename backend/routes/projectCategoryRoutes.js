const {
  postCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/projectCategoryCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const projectCatRouter = require("express").Router();

projectCatRouter.post("/", authMiddleware, restrictTo("admin"), postCategory);
projectCatRouter.get("/all", getAllCategory);
projectCatRouter.get(
  "/:slug",
  authMiddleware,
  restrictTo("admin"),
  getCategory
);
projectCatRouter.put(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  updateCategory
);
projectCatRouter.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  deleteCategory
);

module.exports = projectCatRouter;
