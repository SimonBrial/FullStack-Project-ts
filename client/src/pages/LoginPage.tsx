/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = (): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { signIn, responseError, isAuthenticated } = useAuth();

    const onSubmit = handleSubmit((data) => {
        signIn(data);
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/tasks");
    }, [isAuthenticated]);

    return (
        <div className="flex mt-[100px] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                {responseError.map((error, index) => (
                    <div
                        className="bg-red-500 p-2 text-white text-center my-2 rounded-md"
                        key={index}
                    >
                        {error}
                    </div>
                ))}
                <h1 className="text-xl font-bold text-center">Login</h1>
                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Email"
                    />
                    {errors.email && (
                        <p className="text-red-500">Email is required</p>
                    )}
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Password"
                    />
                    {errors.password && (
                        <p className="text-red-500">Password is required</p>
                    )}
                    <button
                        type="submit"
                        className="hover:bg-blue-500 transition-all bg-blue-600 w-full py-2 rounded-md mt-2"
                    >
                        Login
                    </button>
                </form>
                <p className="flex gap-x-2 justify-between mt-2">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-sky-500">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
