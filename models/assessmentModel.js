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
    isActive: {
      type: Boolean,
      default: true,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: false,
    },
    examDate: Date,
    subjects: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Subject",
      },
    ],
    groups: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Group",
      },
    ],
    students: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

assessmentSchema.virtual("totalSubjects").get(function () {
  return this.subjects.length;
});

assessmentSchema.virtual("duration").get(function () {
  let duration = 0;
  this.subjects.forEach((sub) => (duration += sub.duration));
  return duration;
});

assessmentSchema.pre(/^find/, function (next) {
  this.populate("author", "-__v -passwordChangedAt").populate(
    "subjects",
    "groups"
  );
  next();
});

const Assessment = mongoose.model("Assessment", assessmentSchema);

module.exports = Assessment;
