const {
  postTutorialCategory,
  getAllTutCategories,
  getATutCategory,
  updateATutCategory,
  deleteATutCategory,
} = require("../controllers/tutCatCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const tutCatRouter = require("express").Router();

tutCatRouter.post("/post", authMiddleware, restrictTo("admin"), postTutorialCategory);
tutCatRouter.get("/", getAllTutCategories);
tutCatRouter.get("/:id", authMiddleware, restrictTo("admin"), getATutCategory);
tutCatRouter.put("/:id", authMiddleware, restrictTo("admin"), updateATutCategory);
tutCatRouter.delete("/:id", authMiddleware, restrictTo("admin"), deleteATutCategory);

module.exports = tutCatRouter;
