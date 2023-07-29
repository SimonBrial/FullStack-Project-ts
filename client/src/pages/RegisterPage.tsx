/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const RegisterPage: React.FC = (): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signUp, isAuthenticated, responseError } = useAuth();
    const navigate = useNavigate();
    //console.log(responseError);

    useEffect(() => {
        if (isAuthenticated) navigate("/tasks");
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signUp(values);
    });

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md m-auto mt-[100px]">
            {responseError.map((error, index) => (
                <div
                    className="bg-red-500 p-2 text-white text-center my-2 rounded-md"
                    key={index}
                >
                    {error}
                </div>
            ))}
            <h1 className="text-xl font-bold text-center">Register</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    {...register("userName", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="User Name"
                />
                {errors.userName && (
                    <p className="text-red-500">UserName is required</p>
                )}
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
                    Register
                </button>
            </form>
            <p className="flex gap-x-2 justify-between mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-sky-500">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;
