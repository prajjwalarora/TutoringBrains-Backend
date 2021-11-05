const Question = require("../models/questionModel");
const catchAsync = require("../utils/catchAsync");

exports.createQuestion = catchAsync(async (req, res, next) => {
  const acceptedFields = ["type", "text", "answers", "correctAnswer"];
  const keys = Object.keys(req.body);
  const data = {};
  keys.forEach((key) => {
    if (acceptedFields.includes(key)) {
      data[key] = req.body[key];
    }
  });
  const question = await Question.create(data);
  res.status(200).json({
    status: "success",
    data: {
      id: question.id,
    },
  });
});

exports.getQuestion = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  res.status(200).json({
    status: "success",
    data: {},
  });
});
