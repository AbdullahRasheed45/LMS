const {
  createPost,
  getAQuestion,
  getAllQuestion,
  deleteQuestion,
  updateQuestion,
  updateAnswer,
  createAnswer,
  addComment,
  deleteComment,
} = require("../controllers/qna/qnaCtrl");
const {
  postTag,
  deleteTag,
  updateTag,
  getTag,
  getAllTag,
} = require("../controllers/qna/qnaTagCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const qnaRouter = require("express").Router();

qnaRouter.post("/tag", authMiddleware, restrictTo("admin"), postTag);

qnaRouter.post("/", authMiddleware, createPost);
qnaRouter.post("/answer/:postId", authMiddleware, createAnswer);
qnaRouter.post("/post/comment/:quesId", authMiddleware, addComment);
qnaRouter.get("/:slug", getAQuestion);
qnaRouter.get("/", getAllQuestion);
qnaRouter.get("/tag/:slug", getTag);
qnaRouter.get("/tag", getAllTag);
qnaRouter.delete("/:postId/:quesId/:ansId", authMiddleware, deleteQuestion);
qnaRouter.delete(
  "/post/comment/delete/:quesId/:commentId",
  authMiddleware,
  deleteComment
);
qnaRouter.put("/tag/:id", authMiddleware, restrictTo("admin"), deleteTag);
qnaRouter.put("/:id", authMiddleware, updateQuestion);
qnaRouter.put("/answer/:id", authMiddleware, updateAnswer);
qnaRouter.put(
  "/tag/:id",
  authMiddleware,
  restrictTo("admin", "user"),
  updateTag
);

module.exports = qnaRouter;
