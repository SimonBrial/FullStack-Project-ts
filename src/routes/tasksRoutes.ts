import { Router } from "express";
import { authRequired } from "../middleware/validateToken";
import {
    getTask,
    getTasks,
    createTask,
    deleteTask,
    updateTask,
} from "../controllers/taskController";
import { validateSchema } from "../middleware/validatorMiddelware";
import { createTaskSchema } from "../schemas/taskSchema";

const router = Router();

router.get("/tasks", authRequired, getTasks);
router.get("/tasks/:id", authRequired, getTask);
router.post(
    "/tasks",
    authRequired,
    validateSchema(createTaskSchema),
    createTask,
);
router.delete("/tasks/:id", authRequired, deleteTask);
router.put("/tasks/:id", authRequired, updateTask);

export { router as tasksRouter };
