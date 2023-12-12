const {
  createWork,
  getAWork,
  getAllWork,
  updateAWork,
  deleteAWork,
} = require("../controllers/workWithUsCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const workRouter = require("express").Router();

workRouter.post("/", createWork);
workRouter.get("/", authMiddleware, restrictTo("admin"), getAllWork);
workRouter.get("/:slug", authMiddleware, restrictTo("admin"), getAWork);
workRouter.put("/:id", authMiddleware, restrictTo("admin"), updateAWork);
workRouter.delete("/:id", authMiddleware, restrictTo("admin"), deleteAWork);

module.exports = workRouter;
