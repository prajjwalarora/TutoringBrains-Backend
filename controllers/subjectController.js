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

exports.getSubject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const subject = await Subject.findById(id);
  res.status(200).json({
    status: "success",
    data: {},
  });
});
