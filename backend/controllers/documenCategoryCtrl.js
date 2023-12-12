const { default: slugify } = require("slugify");
const DocCat = require("../models/documentCategoryModel");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../config/validateMongoDbId");

const postDocumentCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const postDocCat = await DocCat.create(req.body);
    res.status(200).json({
      status: true,
      message: "Document Category Created Successfully!",
      postDocCat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllDocCategories = asyncHandler(async (req, res) => {
  try {
    const getAllCategories = await DocCat.find();
    res.status(200).json({
      status: true,
      message: "All Documents fetched successfully!",
      getAllCategories,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getADocCategory = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const getADoc = await DocCat.findOne({ slug: slug });
    res.status(200).json({
      status: true,
      message: "Document Data is Fetched Successfully!",
      getADoc,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteADocCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteADoc = await DocCat.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Document Category Deleted Successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateADocCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updateADoc = await DocCat.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Document Category Updated Successfully!",
      updateADoc,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  postDocumentCategory,
  getAllDocCategories,
  getADocCategory,
  deleteADocCategory,
  updateADocCategory,
};
