const mongoose = require("mongoose");

const assessmentSubmissionSchema = mongoose.Schema(
  {
    assessment: {
      type: mongoose.Schema.ObjectId,
      ref: "Assessment",
      required: [
        true,
        "id of assessment is required while submitting a reponse.",
      ],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "userId is required while submitting a reponse."],
    },
    isEvaluated: {
      type: Boolean,
      default: false,
    },
    correctAns: {
      type: Number,
      default: 0,
    },
    incorrectAns: {
      type: Number,
      default: 0,
    },
    marksObtained: {
      type: Number,
      default: 0,
    },
    selectedAnswers: {
      type: Object,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// assessmentSchema.virtual("totalSubjects").get(function () {
//   return this.subjects.length;
// });

// assessmentSchema.virtual("totalSubjects").get(function () {
//   let duration = 0;
//   this.subjects.forEach((sub) => (duration += sub.duration));
//   return duration;
// });

assessmentSubmissionSchema.pre(/^find/, function (next) {
  this.populate("assessment").populate("user");
  next();
});

const AssessmentSubmission = mongoose.model(
  "AssessmentSubmission",
  assessmentSubmissionSchema
);

module.exports = AssessmentSubmission;
