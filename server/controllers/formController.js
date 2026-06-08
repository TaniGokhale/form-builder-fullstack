const Form = require("../models/Form");

// CREATE FORM
const createForm = async (req, res) => {
  try {
    const { title, fields } = req.body;

    // slug auto-generate
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const form = await Form.create({
      title,
      slug,
      fields,
    });

    res.status(201).json(form);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL FORMS
const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE FORM
const getFormBySlug = async (req, res) => {
  try {
    const form = await Form.findOne({ slug: req.params.slug });
    res.json(form);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createForm, getForms, getFormBySlug };