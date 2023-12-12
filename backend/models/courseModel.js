const mongoose = require("mongoose");

let courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 350,
      require: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 5000,
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDxBClJiLKIN7S25p3gK_5aX_HSxGZ_kbnrA&usqp=CAU",
    },
    category: {
      type: String,
      default: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    totalHours: {
      type: String,
      default: 0,
    },
    enrolls: {
      type: String,
      default: 0,
    },
    rating: [
      {
        stars: Number,
        comment: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
