/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "./axios";

const registerRequest = (user: any) => axios.post(`/register`, user);
const loginRequest = (user: any) => axios.post(`/login`, user);
const verifyTokenRequest = (user: any) => axios.get("/verify");

export { registerRequest, loginRequest, verifyTokenRequest };
