import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({ students: 0, classes: 0 });
  const [recentStudents, setRecentStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsRes = await api.get("/students");
        const classesRes = await api.get("/classes");
        setStats({
          students: studentsRes.data.length,
          classes: classesRes.data.length,
        });
        setRecentStudents(studentsRes.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Students</h3>
          <p style={{ fontSize: "2rem" }}>{stats.students}</p>
          <Link to="/students" className="btn btn-primary">
            Manage Students
          </Link>
        </div>
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Classes</h3>
          <p style={{ fontSize: "2rem" }}>{stats.classes}</p>
          <Link to="/classes" className="btn btn-primary">
            Manage Classes
          </Link>
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          background: "white",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h3>Recent Students</h3>
        {recentStudents.length === 0 ? (
          <p>No students yet.</p>
        ) : (
          <ul>
            {recentStudents.map((s) => (
              <li key={s.id}>
                {s.first_name} {s.last_name} - {s.email}
              </li>
            ))}
          </ul>
        )}
        <Link to="/students/new" className="btn btn-primary">
          Add New Student
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
