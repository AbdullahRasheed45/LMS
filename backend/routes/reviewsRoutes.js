const {
  createReview,
  getAllReview,
  getAReview,
  deleteAReview,
  updateReviewStatus,
} = require("../controllers/reviewCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const reviewRoutes = require("express").Router();

reviewRoutes.post("/", authMiddleware, createReview);
reviewRoutes.get("/", getAllReview);
reviewRoutes.get("/:id", authMiddleware, restrictTo("admin"), getAReview);
reviewRoutes.delete("/:id", authMiddleware, restrictTo("admin"), deleteAReview);
reviewRoutes.put("/:id", authMiddleware, restrictTo("admin"), updateReviewStatus);

module.exports = reviewRoutes;
