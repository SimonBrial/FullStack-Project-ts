import { Request, Response } from "express";
import taskModel from "../models/taskModel";
import { AuthRequest } from "../interface/interface";

const getTask = async (req: AuthRequest, res: Response) => {
    const foundedTask = await taskModel
        .findById({ user: req.user?.id })
        .populate("user");
    if (!foundedTask) {
        return res.status(404).json("Task not found");
    }
    res.json(foundedTask);
};

const getTasks = async (req: AuthRequest, res: Response) => {
    const tasks = await taskModel.find({ user: req.user?.id }).populate("user");
    res.json(tasks);
};

const createTask = async (req: AuthRequest, res: Response) => {
    const { title, description, date } = req.body;

    const newTask = new taskModel({
        title,
        description,
        date,
        user: req.user?.id,
    });

    const savedTask = await newTask.save();
    res.json(savedTask);
};

const deleteTask = async (req: Request, res: Response) => {
    const foundedTaskToDelete = await taskModel.findById(req.params.id);
    if (!foundedTaskToDelete) {
        return res.status(404).json({ message: "Task not found" });
    }
    return res.sendStatus(204);
};

const updateTask = async (req: Request, res: Response) => {
    const foundedTaskToUpdate = await taskModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
    );
    if (!foundedTaskToUpdate) {
        return res.status(404).json({ message: "Task not found" });
    }
    res.json(foundedTaskToUpdate);
};

export { getTask, getTasks, createTask, deleteTask, updateTask };
