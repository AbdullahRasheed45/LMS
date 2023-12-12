const { default: slugify } = require("slugify");
const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../config/validateMongoDbId");

// CREATE OR POST THE VIDEO

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

// GET A VIDEO

const getSingleBlog = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ title: slug });
    res.status(200).json({
      status: true,
      message: "Blog found!",
      blog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// GET ALL VIDEOS

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      status: true,
      message: "Blogs Found Successfully!",
      blogs, // You might want to send the list of blogs here
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

// UPDATE A VIDEO

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const update = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      status: true,
      message: "Blog Updated Successfully!",
      update,
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
