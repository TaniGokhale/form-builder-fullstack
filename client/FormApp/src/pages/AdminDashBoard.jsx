import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const res = await API.get("/forms");
      setForms(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading Forms...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1>Admin Dashboard</h1>

        <Link to="/admin/create">
          <button>Create New Form</button>
        </Link>
      </div>

      {forms.length === 0 ? (
        <div className="card">
          <h3>No Forms Found</h3>
          <p>Create your first form.</p>
        </div>
      ) : (
        <div className="dashboard-grid">
          {forms.map((form) => (
            <div
              className="dashboard-card"
              key={form._id}
            >
              <h2>{form.title}</h2>

              <p>
                <strong>Slug:</strong>{" "}
                {form.slug}
              </p>

              <p>
                <strong>Fields:</strong>{" "}
                {form.fields?.length}
              </p>

              <div className="action-buttons">

                <Link
                  to={`/form/${form.slug}`}
                >
                  <button>
                    Open Form
                  </button>
                </Link>

                <Link
                  to={`/admin/responses/${form._id}`}
                >
                  <button>
                    Responses
                  </button>
                </Link>

                <Link
                  to={`/admin/analytics/${form._id}`}
                >
                  <button>
                    Analytics
                  </button>
                </Link>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashBoard;