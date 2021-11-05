const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["mcq", "one-line", "paragraph"],
      default: "mcq",
    },
    text: {
      type: String,
      required: [true, "Each question must have a field text."],
    },
    answers: [
      {
        id: {
          type: String,
          unique: true,
          required: [true, "Each answer must have an id"],
        },
        text: {
          type: String,
          required: [true, "Each answer must have an text"],
        },
      },
    ],
    correctAnswer: {
      type: String,
      required: [true, "Each question must have a correct answer"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
