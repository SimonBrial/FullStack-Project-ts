import { Request, Response } from "express";
import taskModel from "../models/taskModel";
import { AuthRequest } from "../interface/interface";

const getTask = async (req: AuthRequest, res: Response) => {
    try {
        const task = await taskModel.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        return res.json(task);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const getTasks = async (req: AuthRequest, res: Response) => {
    try {
        const tasks = await taskModel
            .find({ user: req.user?.id })
            .populate("user");
        res.json(tasks);
    } catch (err) {
        return res.status(404).json({ message: "Task not found" });
    }
};

const createTask = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, date } = req.body;

        const newTask = new taskModel({
            title,
            description,
            date,
            user: req.user?.id,
        });

        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (error) {
        return res.status(404).json({ message: "Something went wrong" });
    }
};

const deleteTask = async (req: Request, res: Response) => {
    try {
        const foundedTaskToDelete = await taskModel.findById(req.params.id);
        //console.log(foundedTaskToDelete)
        if (!foundedTaskToDelete) {
            return res.status(404).json({ message: "Task not found" });
        }
        await taskModel.deleteOne(foundedTaskToDelete._id);
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "Task not found" });
    }
};

const updateTask = async (req: Request, res: Response) => {
    try {
        const { title, description, date } = req.body;
        const foundedTaskToUpdate = await taskModel.findByIdAndUpdate(
            { _id: req.params.id },
            { title, description, date },
            { new: true },
        );
        if (!foundedTaskToUpdate) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.json(foundedTaskToUpdate);
    } catch (error) {
        return res.status(404).json({ message: "Task not found" });
    }
};

export { getTask, getTasks, createTask, deleteTask, updateTask };
