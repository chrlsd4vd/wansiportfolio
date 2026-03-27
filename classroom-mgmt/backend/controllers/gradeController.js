const db = require("../config/db");

// Get all grades (optionally filtered by class/student)
exports.getGrades = async (req, res) => {
  const { classId, studentId } = req.query;
  try {
    let query = `
            SELECT g.*, s.first_name, s.last_name, c.name as class_name
            FROM grades g
            JOIN students s ON g.student_id = s.id
            JOIN classes c ON g.class_id = c.id
        `;
    const conditions = [];
    const params = [];

    if (classId) {
      conditions.push("g.class_id = ?");
      params.push(classId);
    }
    if (studentId) {
      conditions.push("g.student_id = ?");
      params.push(studentId);
    }
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }
    query += " ORDER BY g.graded_at DESC";

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new grade
exports.addGrade = async (req, res) => {
  const { class_id, student_id, assignment_name, grade, comments } = req.body;

  if (!class_id || !student_id || !assignment_name) {
    return res.status(400).json({
      message: "class_id, student_id, and assignment_name are required",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO grades (class_id, student_id, assignment_name, grade, comments) VALUES (?, ?, ?, ?, ?)",
      [class_id, student_id, assignment_name, grade || null, comments],
    );
    const [newGrade] = await db.query("SELECT * FROM grades WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json(newGrade[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a grade
exports.updateGrade = async (req, res) => {
  const { id } = req.params;
  const { assignment_name, grade, comments } = req.body;

  try {
    const [existing] = await db.query("SELECT id FROM grades WHERE id = ?", [
      id,
    ]);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Grade not found" });
    }

    await db.query(
      "UPDATE grades SET assignment_name = ?, grade = ?, comments = ? WHERE id = ?",
      [assignment_name, grade, comments, id],
    );

    const [updated] = await db.query("SELECT * FROM grades WHERE id = ?", [id]);
    res.json(updated[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a grade
exports.deleteGrade = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM grades WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Grade not found" });
    }
    res.json({ message: "Grade deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
