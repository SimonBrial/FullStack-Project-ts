import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = (): JSX.Element => {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between items-center py-5 px-10 rounded-lg">
            {isAuthenticated ? (
                <Link to={"/tasks"}>
                    <h1 className="text-2xl font-bold">Tasks Manager</h1>
                </Link>
            ) : (
                <Link to={"/"}>
                    <h1 className="text-2xl font-bold">Tasks Manager</h1>
                </Link>
            )}
            <ul className="flex gap-x-5">
                {isAuthenticated ? (
                    <>
                        <li>
                            Welcome User{" "}
                            <span className="text-indigo-300 ml-2 font-bold text-xl uppercase">
                                {user.userName}
                            </span>
                        </li>
                        <li>
                            <Link
                                to={"/add-task"}
                                className="hover:bg-indigo-500 transition-all bg-indigo-600 w-full py-2 px-5 rounded-md mt-2 cursor-pointer"
                            >
                                Add Task
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/"}
                                onClick={logout}
                                className="hover:bg-indigo-500 transition-all border-2 border-indigo-600 w-full py-2 px-5 rounded-md mt-2 cursor-pointer"
                            >
                                Logout
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link
                                to={"/login"}
                                className="hover:bg-indigo-500 transition-all border-2 border-indigo-600 w-full py-2 px-5 rounded-md mt-2 cursor-pointer"
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/register"}
                                className="hover:bg-indigo-500 transition-all bg-indigo-600 w-full py-2 px-5 rounded-md mt-2 cursor-pointer"
                            >
                                Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
