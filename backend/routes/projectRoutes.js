const {
  postProject,
  getAllProject,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const projectRouter = require("express").Router();

projectRouter.post("/", authMiddleware, restrictTo("admin"), postProject);
projectRouter.get("/all", getAllProject);
projectRouter.get("/:slug", authMiddleware, restrictTo("admin"), getProject);
projectRouter.put(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  updateProject
);
projectRouter.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  deleteProject
);

module.exports = projectRouter;
