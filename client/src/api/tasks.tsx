/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "./axios";

const getTasksRequest = () => axios.get("/tasks");
const getTaskRequest = (id: string) => axios.get(`/tasks/${id}`);
const createTasksRequest = (task: any) => axios.post("/tasks", task);
const updateTasksRequest = (task: any, id: string) =>
    axios.put(`/tasks/${id}`, task);
const deleteTasksRequest = (id: string) => axios.delete(`/tasks/${id}`);

export {
    deleteTasksRequest,
    updateTasksRequest,
    createTasksRequest,
    getTasksRequest,
    getTaskRequest,
};
