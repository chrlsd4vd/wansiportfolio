import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditing) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      const res = await api.get(`/students/${id}`);
      setFormData(res.data);
    } catch (error) {
      console.error("Error fetching student", error);
      setError("Failed to load student");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEditing) {
        await api.put(`/students/${id}`, formData);
      } else {
        await api.post("/students", formData);
      }
      navigate("/students");
    } catch (error) {
      console.error("Error saving student", error);
      setError(error.response?.data?.message || "Failed to save student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        background: "white",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h1>{isEditing ? "Edit Student" : "Add New Student"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name *</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name *</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => navigate("/students")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
