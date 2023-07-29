/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import {
    deleteTasksRequest,
    updateTasksRequest,
    createTasksRequest,
    getTasksRequest,
    getTaskRequest,
} from "../api/tasks";

interface ITask {
    createdAt: string;
    date: string;
    description: string;
    title: string;
    updatedAt: string;
    user: string;
    _id: string;
}

interface IState {
    task: ITask;
}

interface ITaskContextProps {
    tasks: ITask[];
    getTasks: () => void;
    getTask: (id: string) => void;
    createTask: (task: ITask) => void;
    updateTask: (task: ITask, id: string) => void;
    deleteTask: (id: string) => void;
}

const initialState: ITask[] = [
    {
        createdAt: "2023-07-27T20:33:49.265Z",
        date: "2023-07-27T20:14:13.293Z",
        description: "My first description task",
        title: "My first Task",
        updatedAt: "2023-07-27T20:33:49.265Z",
        user: "64bab5467a3d8b4fd2226ef8",
        _id: "64c2d4ad66feaa27f7838bd6",
    },
];

const TaskContext = createContext(initialState);

const useTasks = () => {
    const taskContext = useContext(TaskContext);
    const { tasks, createTask, getTasks, deleteTask, getTask, updateTask } =
        taskContext as unknown as ITaskContextProps;
    if (!taskContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    //console.log(tasks);
    //console.log(tasks.length);
    return { tasks, createTask, getTasks, deleteTask, getTask, updateTask };
};

const TaskProvider = ({ children }: any) => {
    const initialTaskState = [
        {
            createdAt: "2023-07-27T20:33:49.265Z",
            date: "2023-07-27T20:14:13.293Z",
            description: "Initial State",
            title: "Initial State",
            updatedAt: "2023-07-27T20:33:49.265Z",
            user: "64bab5467a3d8b4fd2226ef8",
            _id: "64c2d4ad66feaa27f7838bd6",
        },
    ];
    const [tasks, setTasks] = useState<ITask[]>(initialTaskState);
    //console.log(task);

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getTask = async (id: string) => {
        try {
            const res = await getTaskRequest(id);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const createTask = async (task: ITask) => {
        const res = await createTasksRequest(task);
        console.log(res);
    };

    const deleteTask = async (id: string) => {
        try {
            const res = await deleteTasksRequest(id);
            if (res.status === 204) {
                setTasks(tasks.filter((task: ITask) => task._id !== id));
            }
            //console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const updateTask = async (task: ITask, id: string) => {
        try {
            return await updateTasksRequest(task, id);
        } catch (err) {
            console.log(err);
        }
    };

    const tasksProps: ITaskContextProps = {
        tasks,
        createTask,
        getTasks,
        getTask,
        deleteTask,
        updateTask,
    };

    return (
        <TaskContext.Provider value={tasksProps}>
            {children}
        </TaskContext.Provider>
    );
};

export { TaskProvider, useTasks };
