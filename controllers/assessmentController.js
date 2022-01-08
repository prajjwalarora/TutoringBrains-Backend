const Assessment = require("../models/assessmentModel");
const catchAsync = require("../utils/catchAsync");
const filter = require("../utils/filter");

exports.createAssessment = catchAsync(async (req, res, next) => {
  const acceptedFields = ["name", "author", "duration", "subjects"];
  const data = filter(req.body, acceptedFields);
  const newAssessment = await Assessment.create(data);
  res.status(201).json({
    status: "success",
    data: {
      id: newAssessment.id,
      name: newAssessment.name,
    },
  });
});

exports.addAssessmentSubjects = catchAsync(async (req, res, next) => {
  const acceptedFields = ["subjects"];
  const { id } = req.params;
  const data = filter(req.body, acceptedFields);
  const updatedAssessment = await Assessment.findByIdAndUpdate(id, data);
  console.log(updatedAssessment);
  res.status(200).json({
    status: "success",
    data: {
      id: updatedAssessment.id,
    },
  });
});

exports.getAssessment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const assessment = await Assessment.findById(id);
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
exports.updateAssessment = catchAsync(async (req, res, next) => {
  const acceptedFields = ["name", "author", "duration", "subjects"];
  const { id } = req.params;
  const data = filter(req.body, acceptedFields);
  const updatedAssessment = await Assessment.findByIdAndUpdate(id, data);
  console.log(updatedAssessment);
  res.status(201).json({
    status: "success",
    message: "updated succesfully.",
  });
});
