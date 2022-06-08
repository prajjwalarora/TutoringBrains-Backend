const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/authImage").post(authController.saveuserImage);
router.route("/windowSwitched").post(authController.windowSwitchInfo);

module.exports = router;
