const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var qnaTagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    totalquestion: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Q&ATag", qnaTagSchema);
