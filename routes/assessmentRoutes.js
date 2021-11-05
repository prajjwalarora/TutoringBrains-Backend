const express = require("express");
const assessmentController = require("../controllers/assessmentController");

const router = express.Router();

router.route("/").post(assessmentController.createAssessment);
router
  .route("/:id")
  .get(assessmentController.getAssessment)
  .post()
  .patch()
  .delete();

module.exports = router;
