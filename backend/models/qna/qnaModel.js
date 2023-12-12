const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var qnaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    slug: {
      type: String,
      required: true, // Corrected spelling
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
    answer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Q&A", qnaSchema);
