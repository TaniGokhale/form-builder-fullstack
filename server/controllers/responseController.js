const Response = require("../models/Response");
const Form = require("../models/Form");

// SUBMIT FORM RESPONSE
const submitResponse = async (req, res) => {
  try {
    const { formId } = req.params;
    const { answers } = req.body;

    // check form exists
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // basic validation (dynamic check)
    for (let field of form.fields) {
      if (field.required && !answers[field.label]) {
        return res.status(400).json({
          message: `${field.label} is required`,
        });
      }
    }

    const response = await Response.create({
      formId,
      answers,
    });

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET RESPONSES OF FORM
const getResponses = async (req, res) => {
  try {
    const { formId } = req.params;

    const responses = await Response.find({ formId });

    res.json(responses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  submitResponse,
  getResponses,
};