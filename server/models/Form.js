const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    fields: [
      {
        label: String,
        type: String,
        options: [String],
        required: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", formSchema);