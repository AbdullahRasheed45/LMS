const {
  postVideo,
  getAllVideos,
  getSingleVideo,
  updateVideo,
  deleteAVideo,
} = require("../controllers/videoCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const videoRouter = require("express").Router();

videoRouter.post("/", authMiddleware, restrictTo("admin"), postVideo);
videoRouter.get("/", getAllVideos);
videoRouter.get("/:slug", getSingleVideo);
videoRouter.put("/:id", authMiddleware, restrictTo("admin"), updateVideo);
videoRouter.delete("/:id", deleteAVideo);

module.exports = videoRouter;
