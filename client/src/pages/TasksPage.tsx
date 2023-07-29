/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

interface ITask {
    createdAt: string;
    date: string;
    description: string;
    title: string;
    updatedAt: string;
    user: string;
    _id: string;
}

const TasksPage: React.FC = (): JSX.Element => {
    const { getTasks, tasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, [getTasks]);

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {Array.isArray(tasks) ? (
                <>
                    {tasks.map((task) => (
                        <TaskCard task={task} id={task._id} />
                    ))}
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default TasksPage;
