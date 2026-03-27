const db = require("../config/db");

// Get all classes with teacher name
exports.getAllClasses = async (req, res) => {
  try {
    const [rows] = await db.query(`
            SELECT c.*, t.name as teacher_name 
            FROM classes c 
            LEFT JOIN teachers t ON c.teacher_id = t.id
            ORDER BY c.id DESC
        `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single class with its students
exports.getClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const [classRows] = await db.query("SELECT * FROM classes WHERE id = ?", [
      id,
    ]);
    if (classRows.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Get students enrolled in this class
    const [studentRows] = await db.query(
      `
            SELECT s.* FROM students s
            JOIN class_students cs ON s.id = cs.student_id
            WHERE cs.class_id = ?
        `,
      [id],
    );

    res.json({ ...classRows[0], students: studentRows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new class
exports.createClass = async (req, res) => {
  const { name, subject, teacher_id } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Class name is required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO classes (name, subject, teacher_id) VALUES (?, ?, ?)",
      [name, subject, teacher_id || null],
    );
    const [newClass] = await db.query("SELECT * FROM classes WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json(newClass[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a class
exports.updateClass = async (req, res) => {
  const { id } = req.params;
  const { name, subject, teacher_id } = req.body;

  try {
    const [existing] = await db.query("SELECT id FROM classes WHERE id = ?", [
      id,
    ]);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    await db.query(
      "UPDATE classes SET name = ?, subject = ?, teacher_id = ? WHERE id = ?",
      [name, subject, teacher_id, id],
    );

    const [updated] = await db.query("SELECT * FROM classes WHERE id = ?", [
      id,
    ]);
    res.json(updated[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a class
exports.deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM classes WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Assign students to a class
exports.assignStudents = async (req, res) => {
  const { classId } = req.params;
  const { studentIds } = req.body; // array of student IDs

  if (!Array.isArray(studentIds)) {
    return res.status(400).json({ message: "studentIds must be an array" });
  }

  try {
    // Check if class exists
    const [classExists] = await db.query(
      "SELECT id FROM classes WHERE id = ?",
      [classId],
    );
    if (classExists.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Remove existing assignments (optional: you may want to append instead)
    await db.query("DELETE FROM class_students WHERE class_id = ?", [classId]);

    // Insert new assignments
    if (studentIds.length > 0) {
      const values = studentIds.map((sid) => [classId, sid]);
      await db.query(
        "INSERT INTO class_students (class_id, student_id) VALUES ?",
        [values],
      );
    }

    res.json({ message: "Students assigned successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
