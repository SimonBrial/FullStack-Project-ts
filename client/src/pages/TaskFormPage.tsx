import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface ITask {
    createdAt: string;
    date: string;
    description: string;
    title: string;
    updatedAt: string;
    user: string;
    _id: string;
}

const TaskFormPage: React.FC = (): JSX.Element => {
    const { register, handleSubmit, setValue } = useForm();
    const { createTask, getTask, updateTask } = useTasks();
    const navegate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit((data: ITask) => {
        const dataValid = {
            ...data,
            date: data.date
                ? dayjs.utc(data.date).format()
                : dayjs.utc().format(),
        };
        if (params.id) {
            updateTask(dataValid, params.id);
        } else {
            createTask(dataValid);
        }
        navegate("/tasks");
    });

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task: ITask = await getTask(params.id);
                if (task !== undefined) {
                    setValue("title", task.title);
                    setValue("description", task.description);
                    setValue(
                        "date",
                        task.date
                            ? dayjs(task.date).utc().format("YYYY-MM-DD")
                            : "",
                    );
                }
            }
        }
        loadTask();
    }, []);

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md m-auto my-2">
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    type="text"
                    placeholder="Title"
                    {...register("title")}
                    autoFocus
                />
                <label htmlFor="description">Description</label>
                <textarea
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    rows={3}
                    placeholder="Description"
                    {...register("description")}
                ></textarea>
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    {...register("date")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <button className="hover:bg-indigo-500 transition-all bg-indigo-600 w-full py-2 rounded-md mt-2">
                    Save
                </button>
            </form>
        </div>
    );
};

export default TaskFormPage;
