const express = require("express");
const assessmentController = require("../controllers/assessmentController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);
router
  .route("/")
  .post(assessmentController.createAssessment)
  .get(assessmentController.getAllAssessment);
router.route("/author-only").get(assessmentController.getAuthorAssessment);
router.route("/student-only").get(assessmentController.getStudentAssessment);
router
  .route("/publish-assessment/:id")
  .post(assessmentController.publishAssessment);
router
  .route("/:id")
  .get(assessmentController.getAssessment)
  .post(assessmentController.addAssessmentSubjects)
  .patch(assessmentController.updateAssessment)
  .delete();

module.exports = router;
