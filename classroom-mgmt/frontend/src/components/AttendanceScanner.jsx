import { useState, useEffect } from "react";
import api from "../services/api";

const AttendanceScanner = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass && date) {
      fetchStudentsInClass();
      fetchExistingAttendance();
    }
  }, [selectedClass, date]);

  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes");
      setClasses(res.data);
    } catch (error) {
      console.error("Error fetching classes", error);
    }
  };

  const fetchStudentsInClass = async () => {
    try {
      const res = await api.get(`/classes/${selectedClass}`);
      setStudents(res.data.students || []);
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  const fetchExistingAttendance = async () => {
    try {
      const res = await api.get(
        `/attendance/class/${selectedClass}?date=${date}`,
      );
      const records = res.data;
      const attendanceMap = {};
      records.forEach((r) => {
        attendanceMap[r.student_id] = r.status;
      });
      setAttendance(attendanceMap);
    } catch (error) {
      console.error("Error fetching attendance", error);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async () => {
    const records = students.map((s) => ({
      studentId: s.id,
      status: attendance[s.id] || "absent", // default to absent if not set
    }));

    try {
      await api.post(`/attendance/class/${selectedClass}`, { date, records });
      setMessage("Attendance saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving attendance", error);
      setMessage("Error saving attendance");
    }
  };

  return (
    <div>
      <h1>Mark Attendance</h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          background: "white",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <div className="form-group" style={{ flex: 1 }}>
          <label>Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            required
          >
            <option value="">-- Choose a class --</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.subject})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
      </div>

      {selectedClass && students.length > 0 && (
        <div
          style={{ background: "white", padding: "20px", borderRadius: "8px" }}
        >
          <h3>Students</h3>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>
                    {s.first_name} {s.last_name}
                  </td>
                  <td>
                    <select
                      value={attendance[s.id] || "absent"}
                      onChange={(e) => handleStatusChange(s.id, e.target.value)}
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="late">Late</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            style={{ marginTop: "20px" }}
          >
            Save Attendance
          </button>
          {message && (
            <p
              style={{
                marginTop: "10px",
                color: message.includes("success") ? "green" : "red",
              }}
            >
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceScanner;
