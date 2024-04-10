const router = require("express").Router();
const {
  createTask,
  getCompletedTasks,
  getStagedTasks,
  updateTask,
  deleteTask,
  moveTask,
} = require("../controllers/task");

router.get("/completed", getCompletedTasks);
router.get("/staged", getStagedTasks);
router.patch("/:taskId", updateTask);
router.post("/", createTask);
router.post("/move-task", moveTask);
router.delete("/:taskId", deleteTask);

module.exports = router;
