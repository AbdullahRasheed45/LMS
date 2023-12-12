const mongoose = require("mongoose");

let docSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "Tech Vibes",
    },
    content: {
      type: String,
      required: true,
    },
    keywords: {
      type: [],
      required: true,
    },
    doc_image: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDxBClJiLKIN7S25p3gK_5aX_HSxGZ_kbnrA&usqp=CAU",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", docSchema);
