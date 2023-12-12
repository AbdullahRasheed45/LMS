const { default: slugify } = require("slugify");
const Doc = require("../models/documentationModel");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../config/validateMongoDbId");

// CREATE OR POST THE doc

const postdoc = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const newdoc = await Doc.create(req.body);
    res.status(200).json({
      status: true,
      message: "New Document Created Successfully!",
      newdoc,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// GET A doc

const getSingledoc = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const doc = await Doc.findOne({ slug: slug });
    res.status(200).json({
      status: true,
      message: "Document found!",
      doc,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// GET ALL docS

const getAlldocs = asyncHandler(async (req, res) => {
  try {
    const docs = await Doc.find();
    res.status(200).json({
      status: true,
      message: "Document Found Successfully!",
      docs, // You might want to send the list of docs here
    });
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE doc

const deleteAdoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedoc = await Doc.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Document Deleted Successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// UPDATE A doc

const updatedoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const update = await Doc.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      status: true,
      message: "Document Updated Successfully!",
      update,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  postdoc,
  getAlldocs,
  getSingledoc,
  deleteAdoc,
  updatedoc,
};
