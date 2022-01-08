const express = require("express");
const subjectController = require("../controllers/subjectController");

const router = express.Router();

router.route("/").post(subjectController.createSubject);
router
  .route("/:id")
  .get(subjectController.getSubject)
  .post(subjectController.addSubjectQuestion)
  .patch()
  .delete();

module.exports = router;
