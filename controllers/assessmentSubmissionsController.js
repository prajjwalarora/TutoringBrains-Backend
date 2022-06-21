const Assessment = require("../models/assessmentModel");
const AssessmentSubmissions = require("../models/assessmentSubmissionsModel");
const Question = require("../models/questionModel");
const catchAsync = require("../utils/catchAsync");
const filter = require("../utils/filter");

exports.submitResponse = catchAsync(async (req, res, next) => {
  const acceptedFields = [
    "assessment",
    "user",
    "selectedAnswers",
    "tabSwitchCount",
    "fullScreenExitFlagCount",
  ];
  const data = filter.filterObj(req.body, acceptedFields);
  const newAssessmentSubmissions = await AssessmentSubmissions.create(data);
  res.status(201).json({
    status: "success",
    data: {
      newAssessmentSubmissions,
    },
  });
});

exports.getAllSubmission = catchAsync(async (req, res, next) => {
  const findParam = {};
  findParam["userId"] = req.user._id;
  const assessment = await AssessmentSubmissions.find(findParam);
  res.status(200).json({
    status: "success",
    data: {
      assessment,
    },
  });
});

exports.generateResult = catchAsync(async (req, res, next) => {
  const acceptedFields = ["assessment"];
  const data = filter.filterObj(req.body, acceptedFields);

  let correctAns = 0;
  let incorrectAns = 0;
  const assessments = await AssessmentSubmissions.find(data);
  assessments.forEach(async (assessment) => {
    if (!assessment.isEvaluated) {
      const selectedAnswers = assessment["selectedAnswers"];
      Object.keys(selectedAnswers).forEach((key) => {
        const subjects = assessment["selectedAnswers"][key];
        Object.keys(subjects).forEach((key) => {
          if (key === subjects[key]) {
            correctAns++;
          } else {
            incorrectAns++;
          }
        });
      });
      console.log(correctAns);
      console.log(incorrectAns);
      assessment["isEvaluated"] = true;
      assessment["correctAns"] = correctAns;
      assessment["incorrectAns"] = incorrectAns;
      assessment["marksObtained"] = correctAns;
      await assessment.save();
    }
  });
  const actualAssessment = await Assessment.findById(data["assessment"]);
  actualAssessment["isExpired"] = true;
  await actualAssessment.save();
  res.status(200).json({
    status: "success",
    data: {
      // assessment,
    },
  });
});

exports.getResult = catchAsync(async (req, res, next) => {
  // const acceptedFields = ["assessment"];
  const { assessment } = req.params;
  // const findParam = {};
  // findParam["userId"] = req.user._id;
  const assessments = await AssessmentSubmissions.find({ assessment });
  res.status(200).json({
    status: "success",
    data: {
      assessments,
    },
  });
});

exports.getAllResults = catchAsync(async (req, res, next) => {
  const findParam = {};
  findParam["userId"] = req.user._id;
  const assessment = await AssessmentSubmissions.find(findParam);
  res.status(200).json({
    status: "success",
    data: {
      assessment,
    },
  });
});
