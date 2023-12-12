const {
  postSession,
  getASession,
  getAllSession,
  updateASession,
  deleteASession,
} = require("../controllers/bookSessionCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const bookSessionRouter = require("express").Router();

bookSessionRouter.post("/", authMiddleware, restrictTo("admin"), postSession);
bookSessionRouter.get("/all", getAllSession);
bookSessionRouter.get("/:slug", authMiddleware, restrictTo("admin"), getASession);
bookSessionRouter.put("/:id", authMiddleware, restrictTo("admin"), updateASession);
bookSessionRouter.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  deleteASession
);

module.exports = bookSessionRouter;
