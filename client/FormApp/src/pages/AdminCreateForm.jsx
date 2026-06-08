import { useState } from "react";
import API from "../services/api";

const AdminCreateForm = () => {
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields([
      ...fields,
      {
        label: "",
        type: "text",
        options: [],
        required: false,
      },
    ]);
  };

  const removeField = (index) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const addOption = (index, option) => {
    if (!option.trim()) return;

    const updated = [...fields];
    updated[index].options.push(option);
    setFields(updated);
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleSubmit = async () => {
    try {
      const slug = generateSlug(title);

      await API.post("/forms", {
        title,
        slug,
        fields,
      });

      alert("Form Created Successfully");

      setTitle("");
      setFields([]);
    } catch (err) {
      console.log(err);
      alert("Error creating form");
    }
  };

  return (
    <div className="container">
      <div className="form-builder-card">

        <h1>Create New Form</h1>

        <input
          placeholder="Enter Form Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <button onClick={addField}>
          + Add Field
        </button>

        {fields.map((field, index) => (
          <div
            key={index}
            className="field-card"
          >
            <h3>
              Field {index + 1}
            </h3>

            <input
              placeholder="Field Label"
              value={field.label}
              onChange={(e) =>
                updateField(
                  index,
                  "label",
                  e.target.value
                )
              }
            />

            <select
              value={field.type}
              onChange={(e) =>
                updateField(
                  index,
                  "type",
                  e.target.value
                )
              }
            >
              <option value="text">
                Text
              </option>

              <option value="number">
                Number
              </option>

              <option value="select">
                Select
              </option>
            </select>

            <label
              style={{
                display: "block",
                marginTop: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) =>
                  updateField(
                    index,
                    "required",
                    e.target.checked
                  )
                }
              />

              Required Field
            </label>

            {field.type === "select" && (
              <>
                <input
                  placeholder="Press Enter to add option"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addOption(
                        index,
                        e.target.value
                      );

                      e.target.value = "";
                    }
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    marginTop: "10px",
                  }}
                >
                  {field.options.map(
                    (opt, i) => (
                      <span
                        key={i}
                        className="option-chip"
                      >
                        {opt}
                      </span>
                    )
                  )}
                </div>
              </>
            )}

            <button
              onClick={() =>
                removeField(index)
              }
              style={{
                marginTop: "15px",
              }}
            >
              Delete Field
            </button>
          </div>
        ))}

        <button
          style={{
            marginTop: "20px",
          }}
          onClick={handleSubmit}
        >
          Save Form
        </button>

      </div>
    </div>
  );
};

export default AdminCreateForm;