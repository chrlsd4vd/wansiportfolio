const db = require("../config/db");

// Mark attendance for multiple students in a class on a given date
exports.markAttendance = async (req, res) => {
  const { classId } = req.params;
  const { date, records } = req.body; // records: [{ studentId, status }]

  if (!date || !Array.isArray(records)) {
    return res.status(400).json({ message: "Date and records array required" });
  }

  try {
    // Check class exists
    const [classCheck] = await db.query("SELECT id FROM classes WHERE id = ?", [
      classId,
    ]);
    if (classCheck.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Insert or update each attendance record
    for (const rec of records) {
      const { studentId, status } = rec;
      if (!studentId || !status) continue;

      // Use INSERT ... ON DUPLICATE KEY UPDATE to handle existing records
      await db.query(
        `INSERT INTO attendance (class_id, student_id, date, status) 
                 VALUES (?, ?, ?, ?) 
                 ON DUPLICATE KEY UPDATE status = ?`,
        [classId, studentId, date, status, status],
      );
    }

    res.json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get attendance for a class on a specific date
exports.getAttendanceByDate = async (req, res) => {
  const { classId } = req.params;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date query parameter required" });
  }

  try {
    const [rows] = await db.query(
      `
            SELECT a.*, s.first_name, s.last_name 
            FROM attendance a
            JOIN students s ON a.student_id = s.id
            WHERE a.class_id = ? AND a.date = ?
        `,
      [classId, date],
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get attendance history for a student in a class
exports.getStudentAttendance = async (req, res) => {
  const { studentId } = req.params;
  const { classId } = req.query;

  try {
    let query = "SELECT * FROM attendance WHERE student_id = ?";
    const params = [studentId];
    if (classId) {
      query += " AND class_id = ?";
      params.push(classId);
    }
    query += " ORDER BY date DESC";

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
