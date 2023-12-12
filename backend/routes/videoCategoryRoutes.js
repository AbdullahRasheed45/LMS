const {
  postVideo,
  getAllVideos,
  getSingleVideo,
  updateVideo,
  deleteAVideo,
} = require("../controllers/videoCatergoryCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const videoCatRouter = require("express").Router();

videoCatRouter.post("/", authMiddleware, restrictTo("admin"), postVideo);
videoCatRouter.get("/all", getAllVideos);
videoCatRouter.get(
  "/:slug",
  authMiddleware,
  restrictTo("admin"),
  getSingleVideo
);
videoCatRouter.put("/:id", authMiddleware, restrictTo("admin"), updateVideo);
videoCatRouter.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  deleteAVideo
);

module.exports = videoCatRouter;
