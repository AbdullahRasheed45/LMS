const {
  postBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteABlog,
} = require("../controllers/blogCategoryCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const blogCatRouter = require("express").Router();

blogCatRouter.post("/", authMiddleware, restrictTo("admin"), postBlog);
blogCatRouter.get("/all", getAllBlogs);
blogCatRouter.get("/:slug", authMiddleware, restrictTo("admin"), getSingleBlog);
blogCatRouter.put("/:id", authMiddleware, restrictTo("admin"), updateBlog);
blogCatRouter.delete("/:id", authMiddleware, restrictTo("admin"), deleteABlog);

module.exports = blogCatRouter;
