const express = require("express");
const classController = require("../controllers/classController");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(authController.protect);
router.route("/").post(classController.scheduleClass);

router.route("/author-only").get(classController.authorClassess);
router.route("/student-only").get(classController.studentClassess);
router.route("/student-validation").post(classController.studentValidation);
router.route("/author-validation").post(classController.authorValidation);
// router.route("/peerjs").all();

module.exports = router;
