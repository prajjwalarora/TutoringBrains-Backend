const mongoose = require("mongoose");

const classSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name of class is required."],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    roomId: String,
    classDate: Date,
    isExpired: {
      type: Boolean,
      default: false,
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

classSchema.pre(/^find/, function (next) {
  this.populate("students", "-__v -passwordChangedAt").populate(
    "author",
    "-__v -passwordChangedAt"
  );
  next();
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
