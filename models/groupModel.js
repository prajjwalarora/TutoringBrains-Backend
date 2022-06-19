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
    isActive: {
      type: Boolean,
      default: true,
    },
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
