const Tutorial = require("../models/tutorialModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { validateMongodbId } = require("../config/validateMongoDbId");

// POST THE TUTORIAL
const postTutorial = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    if (req.body.tutorialCategory) {
      req.body.tutorialCategorySlug = slugify(
        req.body.tutorialCategory.toLowerCase()
      );
    }
    const postTut = await Tutorial.create(req.body);
    res.status(200).json({
      status: true,
      message: "Tutorial Created Successfully!",
      postTut,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// GET ALL TUTORIAL
const getAllTutorial = asyncHandler(async (req, res) => {
  try {
    const allTutorial = await Tutorial.find();
    res.status(200).json({
      status: true,
      message: "All Tutorial Fetched Successfully",
      allTutorial,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// GET A TUTORIAL
const getAtutorial = asyncHandler(async (req, res) => {
  const { slug, type } = req.params; // Destructure slug and type from req.params
  try {
    const tutorial = await Tutorial.findOne({
      slug: slug,
      tutorialCategorySlug: type,
    });
    const tutorialTopics = await Tutorial.find({ tutorialCategorySlug: type })
      .select("topicName title slug tutorialCategorySlug") // Corrected "sslug" to "slug"
      .sort("createdAt");
    res.status(200).json({
      status: true,
      message: "Tutorial is Fetched Successfully!",
      tutorial,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//UPDATE A TUTORIAL

const updateAtutorial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    if (req.body.tutorialCategory) {
      req.body.tutorialCategorySlug = slugify(
        req.body.tutorialCategory.toLowerCase()
      );
    }
    const updateTutorial = await Tutorial.findByIdAndUpdate(id, req.body, {
      new: true, // Fix typo here
    });
    res.status(200).json({
      status: true,
      message: "Tutorial is Updated Successfully!",
      updateTutorial,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete A TUTORIAL
const deleteAtutorial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const tutorial = await Tutorial.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Tutorial is Deleted Successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  postTutorial,
  getAllTutorial,
  getAtutorial,
  updateAtutorial,
  deleteAtutorial,
}; // Closing curly brace was missing here
