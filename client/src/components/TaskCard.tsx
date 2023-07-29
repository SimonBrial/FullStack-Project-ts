import React from "react";
import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface ITask {
    createdAt: string;
    updatedAt: string;
    date: string;
    title: string;
    description: string;
    _id: string;
}
interface ITaskCard {
    task: ITask;
    id: string;
}

const TaskCard: React.FC<ITaskCard> = ({ task, id }) => {
    const { deleteTask } = useTasks();
    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md flex flex-col justify-between">
            <div key={id}>
                <h1 className="text-2xl font-bold mb-1">{task.title}</h1>
                <hr />
                <p className="text-slate-300 text-xl font-bold mt-1">
                    {task.description}
                </p>
                {/* <p>{new Date(task.date).toLocaleString()}</p> */}
                <p>{dayjs.utc(task.date).format("DD/MM/YYYY")}</p>
            </div>
            <div className="flex gap-x-2 justify-center items-center mt-2">
                <button
                    onClick={() => deleteTask(task._id)}
                    className="hover:bg-reg-400 transition-all bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                >
                    Delete
                </button>
                <Link
                    to={`/tasks/${task._id}`}
                    className="hover:bg-blue-500 transition-all bg-blue-600 px-4 py-2 rounded-md"
                >
                    Edit
                </Link>
            </div>
        </div>
    );
};

export default TaskCard;
