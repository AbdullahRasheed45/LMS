const {
  postTutorial,
  getAllTutorial,
  getAtutorial,
  updateAtutorial,
  deleteAtutorial,
} = require("../controllers/tutorialCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const tutorialRouter = require("express").Router();

//POST
tutorialRouter.post("/", authMiddleware, restrictTo("admin"), postTutorial);
tutorialRouter.get("/", authMiddleware, restrictTo("admin"), getAllTutorial);
tutorialRouter.get("/:type/:slug", getAtutorial);
tutorialRouter.put("/:id", authMiddleware, restrictTo("admin"), updateAtutorial);
tutorialRouter.delete("/:id", authMiddleware, restrictTo("admin"), deleteAtutorial);

module.exports = tutorialRouter;
