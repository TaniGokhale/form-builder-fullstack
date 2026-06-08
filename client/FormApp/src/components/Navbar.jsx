import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Form Builder</h2>

      <div>
        <Link to="/">Home</Link>

        <Link to="/admin">
          Dashboard
        </Link>

        <Link to="/admin/create">
          Create Form
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;