const Subject = require("../models/subjectModel");
const catchAsync = require("../utils/catchAsync");

exports.createSubject = catchAsync(async (req, res, next) => {
  const acceptedFields = [
    "name",
    "totalQuestions",
    "timeDuration",
    "questions",
  ];
  const keys = Object.keys(req.body);
  const data = {};
  keys.forEach((key) => {
    if (acceptedFields.includes(key)) {
      data[key] = req.body[key];
    }
  });
  const subject = await Subject.create(data);
  res.status(200).json({
    status: "success",
    data: {
      id: subject.id,
      name: subject.name,
    },
  });
});

exports.addSubjectQuestion = catchAsync(async (req, res, next) => {
  const acceptedFields = ["questions"];
  const { id } = req.params;
  const keys = Object.keys(req.body);
  const data = {};
  keys.forEach((key) => {
    if (acceptedFields.includes(key)) {
      data[key] = req.body[key];
    }
  });
  const updatedSubject = await Subject.findByIdAndUpdate(id, data);
  res.status(200).json({
    status: "success",
    data: {
      id: updatedSubject.id,
    },
  });
});

exports.getSubject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const subject = await Subject.findById(id);
  res.status(200).json({
    status: "success",
    data: subject,
  });
});
