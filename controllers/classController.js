const Class = require("../models/classModel");
const catchAsync = require("../utils/catchAsync");
const filter = require("../utils/filter");
const { uuid } = require("uuidv4");

exports.scheduleClass = catchAsync(async (req, res, next) => {
  const acceptedFields = ["name", "author", "classDate", "students"];
  const data = filter.filterObj(req.body, acceptedFields);
  console.log(data);
  data["author"] = req.user._id;
  data["roomId"] = uuid();
  const newClass = await Class.create(data);
  res.status(201).json({
    status: "success",
    data: {
      classess: newClass,
    },
  });
});

exports.authorClassess = catchAsync(async (req, res, next) => {
  const findParam = {};
  findParam["author"] = req.user._id;
  const allClass = await Class.find(findParam);
  return res.status(200).json({
    status: "success",
    data: {
      classes: allClass,
    },
  });
});

exports.studentClassess = catchAsync(async (req, res, next) => {
  const findParam = {};
  findParam["students"] = req.user._id;
  const allClass = await Class.find(findParam);
  res.status(200).json({
    status: "success",
    data: {
      classes: allClass,
    },
  });
});

exports.studentValidation = catchAsync(async (req, res, next) => {
  const findParam = {};
  findParam["students"] = req.user._id;
  findParam["roomId"] = req.body.actionId;
  const allClass = await Class.find(findParam);
  let isValid = false;
  if (allClass.length > 0) {
    isValid = true;
  }
  res.status(200).json({
    status: "success",
    data: {
      isValid,
    },
  });
});

exports.authorValidation = catchAsync(async (req, res, next) => {
  const findParam = {};
  findParam["author"] = req.user._id;
  findParam["roomId"] = req.body.actionId;
  const allClass = await Class.find(findParam);
  let isValid = false;
  if (allClass.length > 0) {
    isValid = true;
  }
  res.status(200).json({
    status: "success",
    data: {
      isValid,
    },
  });
});
