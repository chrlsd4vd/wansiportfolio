import { useState, useEffect } from "react";
import api from "../services/api";

const Gradebook = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [newGrade, setNewGrade] = useState({
    student_id: "",
    assignment_name: "",
    grade: "",
    comments: "",
  });
  const [editingGrade, setEditingGrade] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchStudentsInClass();
      fetchGrades();
    }
  }, [selectedClass]);

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

  const fetchGrades = async () => {
    try {
      const res = await api.get(`/grades?classId=${selectedClass}`);
      setGrades(res.data);
    } catch (error) {
      console.error("Error fetching grades", error);
    }
  };

  const handleAddGrade = async () => {
    if (!newGrade.student_id || !newGrade.assignment_name) {
      setMessage("Please select a student and enter assignment name");
      return;
    }
    try {
      await api.post("/grades", {
        class_id: selectedClass,
        ...newGrade,
      });
      setNewGrade({
        student_id: "",
        assignment_name: "",
        grade: "",
        comments: "",
      });
      fetchGrades();
      setMessage("Grade added");
    } catch (error) {
      console.error("Error adding grade", error);
      setMessage("Error adding grade");
    }
  };

  const handleUpdateGrade = async () => {
    if (!editingGrade) return;
    try {
      await api.put(`/grades/${editingGrade.id}`, {
        assignment_name: editingGrade.assignment_name,
        grade: editingGrade.grade,
        comments: editingGrade.comments,
      });
      setEditingGrade(null);
      fetchGrades();
      setMessage("Grade updated");
    } catch (error) {
      console.error("Error updating grade", error);
      setMessage("Error updating grade");
    }
  };

  const handleDeleteGrade = async (id) => {
    if (!window.confirm("Delete this grade?")) return;
    try {
      await api.delete(`/grades/${id}`);
      fetchGrades();
      setMessage("Grade deleted");
    } catch (error) {
      console.error("Error deleting grade", error);
      setMessage("Error deleting grade");
    }
  };

  return (
    <div>
      <h1>Gradebook</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>Select Class: </label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">-- Choose a class --</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <>
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <h3>Add Grade</h3>
            <div className="form-group">
              <label>Student</label>
              <select
                value={newGrade.student_id}
                onChange={(e) =>
                  setNewGrade({ ...newGrade, student_id: e.target.value })
                }
              >
                <option value="">-- Select student --</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.first_name} {s.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Assignment Name</label>
              <input
                type="text"
                value={newGrade.assignment_name}
                onChange={(e) =>
                  setNewGrade({ ...newGrade, assignment_name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Grade (0-100)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={newGrade.grade}
                onChange={(e) =>
                  setNewGrade({ ...newGrade, grade: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Comments</label>
              <textarea
                value={newGrade.comments}
                onChange={(e) =>
                  setNewGrade({ ...newGrade, comments: e.target.value })
                }
              />
            </div>
            <button onClick={handleAddGrade} className="btn btn-primary">
              Add Grade
            </button>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>Existing Grades</h3>
            {grades.length === 0 ? (
              <p>No grades recorded yet.</p>
            ) : (
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Assignment</th>
                    <th>Grade</th>
                    <th>Comments</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((g) => (
                    <tr key={g.id}>
                      {editingGrade && editingGrade.id === g.id ? (
                        <>
                          <td>
                            {g.first_name} {g.last_name}
                          </td>
                          <td>
                            <input
                              value={editingGrade.assignment_name}
                              onChange={(e) =>
                                setEditingGrade({
                                  ...editingGrade,
                                  assignment_name: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td>
                            <input
                              value={editingGrade.grade}
                              onChange={(e) =>
                                setEditingGrade({
                                  ...editingGrade,
                                  grade: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td>
                            <input
                              value={editingGrade.comments}
                              onChange={(e) =>
                                setEditingGrade({
                                  ...editingGrade,
                                  comments: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td>
                            <button
                              onClick={handleUpdateGrade}
                              className="btn btn-primary"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingGrade(null)}
                              className="btn"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>
                            {g.first_name} {g.last_name}
                          </td>
                          <td>{g.assignment_name}</td>
                          <td>{g.grade}</td>
                          <td>{g.comments}</td>
                          <td>
                            <button
                              onClick={() => setEditingGrade(g)}
                              className="btn btn-primary"
                              style={{ marginRight: "5px" }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteGrade(g.id)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {message && (
            <p
              style={{
                marginTop: "10px",
                color: message.includes("Error") ? "red" : "green",
              }}
            >
              {message}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Gradebook;
