import express from "express";
import { TaskController } from "../controllers/TaskController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/add-task", protect, TaskController.addTask);
router.get("/get-tasks", protect, TaskController.getTasks);
router.put("/update-task/:id", TaskController.updateTask);
router.delete("/delete-task/:id", TaskController.deleteTask);

export default router;
