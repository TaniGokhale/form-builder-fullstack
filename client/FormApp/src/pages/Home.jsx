import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">

      <div
        style={{
          textAlign: "center",
          paddingTop: "100px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "20px",
          }}
        >
          Dynamic Form Builder Platform
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Create forms, collect responses,
          visualize analytics and manage
          submissions from a single dashboard.
        </p>

        <Link to="/admin">
          <button>
            Open Dashboard
          </button>
        </Link>

        <Link
          to="/admin/create"
          style={{
            marginLeft: "15px",
          }}
        >
          <button>
            Create Form
          </button>
        </Link>
      </div>

    </div>
  );
};

export default Home;