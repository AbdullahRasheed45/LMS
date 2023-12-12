const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      unique: true,
      type: String,
    },
    slug: {
      required: true,
      unique: true,
      type: String,
      index: true,
    },
    tutorialCategory: {
      type: String,
      required: true,
    },
    tutorialCategorySlug: {
      type: String,
      required: true,
    },
    topicName: {
      required: true,
      unique: true,
      type: String,
    },
    content: {
      required: true,
      type: String,
    },
    keywords: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tutorial", tutorialSchema);
