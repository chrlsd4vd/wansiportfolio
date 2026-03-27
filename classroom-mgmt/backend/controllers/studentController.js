const db = require("../config/db");

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM students ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single student by ID
exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM students WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new student
exports.createStudent = async (req, res) => {
  const { first_name, last_name, email, phone, address } = req.body;
  if (!first_name || !last_name) {
    return res
      .status(400)
      .json({ message: "First and last name are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO students (first_name, last_name, email, phone, address) VALUES (?, ?, ?, ?, ?)",
      [first_name, last_name, email, phone, address],
    );
    const [newStudent] = await db.query("SELECT * FROM students WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json(newStudent[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone, address } = req.body;

  try {
    // Check if student exists
    const [existing] = await db.query("SELECT id FROM students WHERE id = ?", [
      id,
    ]);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    await db.query(
      "UPDATE students SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ? WHERE id = ?",
      [first_name, last_name, email, phone, address, id],
    );

    const [updated] = await db.query("SELECT * FROM students WHERE id = ?", [
      id,
    ]);
    res.json(updated[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM students WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
