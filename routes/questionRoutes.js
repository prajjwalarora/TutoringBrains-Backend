const express = require("express");
const questionController = require("../controllers/questionController");

const router = express.Router();

router.route("/").post(questionController.createQuestion);
router.route("/:id").get().patch().delete();

module.exports = router;
