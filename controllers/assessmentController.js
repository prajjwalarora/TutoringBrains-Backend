const Assessment = require("../models/assessmentModel");
const catchAsync = require("../utils/catchAsync");

exports.createAssessment = catchAsync(async (req, res, next) => {
  const acceptedFields = ["name", "author", "duration", "subjects"];
  const keys = Object.keys(req.body);
  const data = {};
  keys.forEach((key) => {
    if (acceptedFields.includes(key)) {
      data[key] = req.body[key];
    }
  });
  const newAssessment = await Assessment.create(data);
  res.status(200).json({
    status: "success",
    data: {
      id: newAssessment.id,
      name: newAssessment.name,
    },
  });
});

exports.getAssessment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const assessment = await Assessment.findById(id);
  console.log(assessment);
  res.status(200).json({
    status: "success",
    data: {
      id: assessment.id,
      name: assessment.name,
      duration: assessment.duration,
      author: assessment.author,
      subjects: assessment.subjects,
    },
  });
});
