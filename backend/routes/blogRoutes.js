const {
  getAllBlogs,
  postBlog,
  getSingleBlog,
  updateBlog,
  deleteABlog,
} = require("../controllers/blogCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const blogRouter = require("express").Router();

blogRouter.post("/", authMiddleware, restrictTo("admin"), postBlog);
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:slug", authMiddleware, getSingleBlog); // Modified line
blogRouter.put("/:id", authMiddleware, restrictTo("admin"), updateBlog);
blogRouter.delete("/:id", deleteABlog);

module.exports = blogRouter;
