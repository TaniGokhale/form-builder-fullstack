const express = require("express");

const router = express.Router();

const {
  getAnalytics,
} = require("../controllers/analyticsController");

router.get("/:formId", getAnalytics);

module.exports = router;