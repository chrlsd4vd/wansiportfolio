const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Teacher login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    // Find teacher by email
    const [rows] = await db.query("SELECT * FROM teachers WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const teacher = rows[0];
    // Compare password with hash
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign(
      { id: teacher.id, email: teacher.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      token,
      teacher: { id: teacher.id, name: teacher.name, email: teacher.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// (Optional) Register new teacher - for simplicity we add via SQL, but you can implement
exports.register = async (req, res) => {
  // Not required for basic system, but you can add if needed
  res.status(501).json({ message: "Not implemented" });
};
