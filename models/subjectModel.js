const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Subject must have a name."],
    },
    duration: {
      type: Number,
      required: [true, "A Subject must have defined duration (in minutes)."],
    },
    questions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

subjectSchema.virtual("totalQuestions").get(function () {
  return this.questions.length;
});

subjectSchema.pre(/^find/, function (next) {
  this.populate("questions");
  next();
});

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
