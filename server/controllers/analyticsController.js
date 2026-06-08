const Response = require("../models/Response");

const getAnalytics = async (req, res) => {
  try {
    const { formId } = req.params;

    const responses = await Response.find({
      formId,
    });

    const analytics = {
      totalResponses: responses.length,
      fields: {},
    };

    responses.forEach((response) => {
      Object.entries(response.answers).forEach(
        ([key, value]) => {
          if (!analytics.fields[key]) {
            analytics.fields[key] = {
              values: [],
            };
          }

          analytics.fields[key].values.push(value);
        }
      );
    });

    Object.keys(analytics.fields).forEach((key) => {
      const values = analytics.fields[key].values;

      const numbers = values.filter(
        (v) => !isNaN(v)
      );

      if (numbers.length > 0) {
        const avg =
          numbers.reduce(
            (a, b) => Number(a) + Number(b),
            0
          ) / numbers.length;

        analytics.fields[key] = {
          type: "number",
          average: avg.toFixed(2),
        };
      } else {
        const count = {};

        values.forEach((v) => {
          count[v] = (count[v] || 0) + 1;
        });

        analytics.fields[key] = {
          type: "select",
          data: count,
        };
      }
    });

    res.json(analytics);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getAnalytics,
};