const express = require("express");
const {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  assignStudents,
} = require("../controllers/classController");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.get("/", getAllClasses);
router.get("/:id", getClassById);
router.post("/", createClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);
router.post("/:classId/assign", assignStudents);

module.exports = router;
