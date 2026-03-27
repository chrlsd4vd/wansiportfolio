import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        backgroundColor: "#2c3e50",
        padding: "1rem",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Classroom Manager
        </Link>
      </div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>
        <Link to="/students" style={{ color: "white", textDecoration: "none" }}>
          Students
        </Link>
        <Link
          to="/attendance"
          style={{ color: "white", textDecoration: "none" }}
        >
          Attendance
        </Link>
        <Link to="/grades" style={{ color: "white", textDecoration: "none" }}>
          Grades
        </Link>
        {user && (
          <>
            <span>Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              className="btn btn-danger"
              style={{ marginLeft: "1rem" }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
