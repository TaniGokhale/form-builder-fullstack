import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const FormPage = () => {
  const { slug } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchForm();
  }, []);

  const fetchForm = async () => {
    const res = await API.get(`/forms/${slug}`);
    setForm(res.data);
  };

  const handleChange = (label, value) => {
    setAnswers((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post(`/responses/${form._id}`, {
      answers,
    });
    alert("Form Submitted!");
  };

  if (!form) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{form.title}</h2>

      <form onSubmit={handleSubmit}>
        {form.fields.map((field, i) => (
          <div key={i} style={{ marginBottom: "15px" }}>
            <label>{field.label}</label>
            <br />

            {/* TEXT */}
            {field.type === "text" && (
              <input
                type="text"
                onChange={(e) =>
                  handleChange(field.label, e.target.value)
                }
              />
            )}

            {/* NUMBER */}
            {field.type === "number" && (
              <input
                type="number"
                onChange={(e) =>
                  handleChange(field.label, e.target.value)
                }
              />
            )}

            {/* SELECT */}
            {field.type === "select" && (
              <select
                onChange={(e) =>
                  handleChange(field.label, e.target.value)
                }
              >
                <option>Select</option>
                {field.options.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;