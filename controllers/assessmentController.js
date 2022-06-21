const Assessment = require("../models/assessmentModel");
const catchAsync = require("../utils/catchAsync");
const filter = require("../utils/filter");

exports.createAssessment = catchAsync(async (req, res, next) => {
  const acceptedFields = ["name", "author", "examDate", "duration", "subjects"];
  const data = filter.filterObj(req.body, acceptedFields);
  console.log(data);
  const newAssessment = await Assessment.create(data);
  res.status(201).json({
    status: "success",
    data: {
      id: newAssessment.id,
      name: newAssessment.name,
      duration: newAssessment.duration,
    },
  });
});

exports.addAssessmentSubjects = catchAsync(async (req, res, next) => {
  const acceptedFields = ["subjects"];
  const { id } = req.params;
  const keys = Object.keys(req.body);
  const data = {};
  keys.forEach((key) => {
    if (acceptedFields.includes(key)) {
      data[key] = req.body[key];
    }
  });
  const updatedAssessment = await Assessment.findByIdAndUpdate(id, {
    $push: { subjects: { $each: data["subjects"] } },
  });
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
  console.log(assessment);
  if (assessment) {
    res.status(200).json({
      status: "success",
      data: {
        id: assessment._id,
        name: assessment.name,
        published: assessment.published,
        duration: assessment.duration,
        author: assessment.author,
        subjects: assessment.subjects,
      },
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {},
    });
  }
});

exports.getAllAssessment = catchAsync(async (req, res, next) => {
  const acceptedFields = ["published"];
  const keys = Object.keys(req.query);
  const findParam = {};
  keys.forEach((key) => {
    if (acceptedFields.includes(key)) {
      findParam[key] =
        key === "published"
          ? req.query[key] === "false"
            ? false
            : true
          : req.query[key];
    }
  });
  const assessment = await Assessment.find(findParam);
  res.status(200).json({
    status: "success",
    data: {
      assessment,
    },
  });
});

exports.getAuthorAssessment = catchAsync(async (req, res, next) => {
  const acceptedFields = ["published"];
  const keys = Object.keys(req.query);
  const findParam = {};
  keys.forEach((key) => {
    if (acceptedFields.includes(key)) {
      findParam[key] =
        key === "published"
          ? req.query[key] === "false"
            ? false
            : true
          : req.query[key];
    }
  });
  findParam["author"] = req.user._id;
  const assessment = await Assessment.find(findParam);
  return res.status(200).json({
    status: "success",
    data: {
      assessment,
    },
  });
});

exports.getStudentAssessment = catchAsync(async (req, res, next) => {
  const findParam = {};
  findParam["students"] = req.user._id;
  const assessment = await Assessment.find(findParam);
  res.status(200).json({
    status: "success",
    data: {
      assessment,
    },
  });
});

exports.updateAssessment = catchAsync(async (req, res, next) => {
  const acceptedFields = ["name", "author", "duration", "subjects"];
  const { id } = req.params;
  const data = filter.filterObj(req.body, acceptedFields);
  const updatedAssessment = await Assessment.findByIdAndUpdate(id, data);
  res.status(201).json({
    status: "success",
    message: "updated succesfully.",
  });
});

exports.publishAssessment = catchAsync(async (req, res, next) => {
  const acceptedFields = ["published", "students", "group"];
  const { id } = req.params;
  const keys = Object.keys(req.body);
  const data = {};
  keys.forEach((key) => {
    if (acceptedFields.includes(key)) {
      data[key] = req.body[key];
    }
  });
  const updatedAssessment = await Assessment.findByIdAndUpdate(id, data);
  res.status(200).json({
    status: "success",
    data: {
      id: updatedAssessment.id,
    },
  });
});
