import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;
    try {
      await api.delete(`/students/${id}`);
      setStudents(students.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error deleting student", error);
    }
  };

  if (loading) return <div>Loading students...</div>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Students</h1>
        <Link to="/students/new" className="btn btn-primary">
          Add New Student
        </Link>
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <thead style={{ background: "#f8f9fa" }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>First Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Last Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Phone</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} style={{ borderTop: "1px solid #dee2e6" }}>
              <td style={{ padding: "10px" }}>{student.id}</td>
              <td style={{ padding: "10px" }}>{student.first_name}</td>
              <td style={{ padding: "10px" }}>{student.last_name}</td>
              <td style={{ padding: "10px" }}>{student.email}</td>
              <td style={{ padding: "10px" }}>{student.phone}</td>
              <td style={{ padding: "10px" }}>
                <Link
                  to={`/students/edit/${student.id}`}
                  className="btn btn-primary"
                  style={{ marginRight: "5px" }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
