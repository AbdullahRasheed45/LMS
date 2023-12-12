const mongoose = require("mongoose");

let projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    link: [
      {
        name: String,
        url: String,
      },
    ],
    images: [],
    author: {
      type: String,
      default: "Tech Vibes",
    },
    price: {
      type: Number,
      default: 0,
    },
    priceAfterDiscount: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    techStack: [],
    keywords: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
