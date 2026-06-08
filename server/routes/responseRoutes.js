const express = require("express");
const router = express.Router();

const {
  submitResponse,
  getResponses,
} = require("../controllers/responseController");

router.post("/:formId", submitResponse);
router.get("/:formId", getResponses);

module.exports = router;