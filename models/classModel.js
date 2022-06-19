const mongoose = require("mongoose");

const classSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name of classess is required while creating."],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    startAt: {
      type: Date,
      required: [true, "startAt is required while creating an class."],
    },
    examDate: Date,
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

// assessmentSchema.virtual("totalSubjects").get(function () {
//   return this.subjects.length;
// });

assessmentSchema.pre(/^find/, function (next) {
  this.populate("author", "-__v -passwordChangedAt").populate("subjects");
  next();
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
