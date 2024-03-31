const router = require("express").Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task");

router.get("/", getTasks);
router.patch("/", updateTask);
router.post("/", createTask);
router.delete("/:taskId", deleteTask);

module.exports = router;
