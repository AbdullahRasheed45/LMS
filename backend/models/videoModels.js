const mongoose = require("mongoose");

let videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDxBClJiLKIN7S25p3gK_5aX_HSxGZ_kbnrA&usqp=CAU",
    },
    description: {
      type: String,
      required: true,
    },
    video_url: {
      type: String,
      required: true,
    },
    keywords: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
