const express = require("express");
const assessmentSubmissionsController = require("../controllers/assessmentSubmissionsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);
router
  .route("/")
  .post(assessmentSubmissionsController.submitResponse)
  .get(assessmentSubmissionsController.getAllSubmission);
router
  .route("/result/:assessment")
  .get(assessmentSubmissionsController.getResult);
router.route("/result").post(assessmentSubmissionsController.generateResult);
// router.route("/student-only").get(assessmentController.getStudentAssessment);
// router
//   .route("/publish-assessment/:id")
//   .post(assessmentController.publishAssessment);
// router
//   .route("/:id")
//   .get(assessmentController.getAssessment)
//   .post(assessmentController.addAssessmentSubjects)
//   .patch(assessmentController.updateAssessment)
//   .delete();

module.exports = router;
