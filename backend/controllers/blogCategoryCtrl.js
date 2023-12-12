const { default: slugify } = require("slugify");
const Blog = require("../models/blogCategoryModel");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../config/validateMongoDbId");

// CREATE OR POST THE Blog

const postBlog = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const newBlog = await Blog.create(req.body);
    res.status(200).json({
      status: true,
      message: "New Blog Created Successfully!",
      newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// GET A Blog

const getSingleBlog = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ slug : slug });
    res.status(200).json({
      status: true,
      message: "Blog found!",
      blog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// GET ALL Blogs

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      status: true,
      message: "Blogs Found Successfully!",
      blogs,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE Blog

const deleteABlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Blog Deleted Successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// UPDATE A Blog

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      status: true,
      message: "Blog Updated Successfully!",
      updatedBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  postBlog,
  getAllBlogs,
  getSingleBlog,
  deleteABlog,
  updateBlog,
};
