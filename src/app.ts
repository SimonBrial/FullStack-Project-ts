import express, { CookieOptions } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/authRoutes";
import { tasksRouter } from "./routes/tasksRoutes";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", tasksRouter);

export default app;
