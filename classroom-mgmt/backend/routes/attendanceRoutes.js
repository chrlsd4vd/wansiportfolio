const express = require("express");
const {
  markAttendance,
  getAttendanceByDate,
  getStudentAttendance,
} = require("../controllers/attendanceController");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.post("/class/:classId", markAttendance);
router.get("/class/:classId", getAttendanceByDate);
router.get("/student/:studentId", getStudentAttendance);

module.exports = router;
