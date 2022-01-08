const mongoose = require("mongoose");

const assessmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [
        true,
        "name of assessment is required while creating an assessment.",
      ],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    duration: {
      type: Number,
      default: 0,
      required: [true, "Duration is required while creating an assessment."],
    },
    subjects: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Subject",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

assessmentSchema.virtual("totalSubjects").get(function () {
  return this.totalSubjects.length;
});

assessmentSchema.pre(/^find/, function (next) {
  this.populate("author", "-__v -passwordChangedAt").populate("subjects");
  next();
});

const Assessment = mongoose.model("Assessment", assessmentSchema);

module.exports = Assessment;
