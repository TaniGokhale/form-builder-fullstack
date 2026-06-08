const express = require("express");
const router = express.Router();
const Form = require("../models/Form");

router.post("/", async (req, res) => {
  try {
    const form = await Form.create(req.body);
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const form = await Form.findOne({
      slug: req.params.slug,
    });

    if (!form) {
      return res.status(404).json({
        message: "Form not found",
      });
    }

    res.json(form);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;