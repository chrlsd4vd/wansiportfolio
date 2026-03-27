const express = require("express");
const {
  getGrades,
  addGrade,
  updateGrade,
  deleteGrade,
} = require("../controllers/gradeController");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.get("/", getGrades);
router.post("/", addGrade);
router.put("/:id", updateGrade);
router.delete("/:id", deleteGrade);

module.exports = router;
