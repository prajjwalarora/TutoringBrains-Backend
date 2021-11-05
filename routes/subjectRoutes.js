const express = require("express");
const subjectController = require("../controllers/subjectController");

const router = express.Router();

router.route("/").post(subjectController.createSubject);
router.route("/:id").get().post().patch().delete();

module.exports = router;
