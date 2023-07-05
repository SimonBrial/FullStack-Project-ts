import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import createAccessToken from "../libs/jwt";
import User from "../models/userModel";
import { AuthRequest } from "../interface/interface";


const register = async (req: Request, res: Response) => {
    const { email, password, userName } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: passwordHash,
            userName,
        });
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            userName: userSaved.userName,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server",
            error: error,
        });
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(400).json({ message: "User not found" });
        }

        if (!password || !userFound.password) {
            return res
                .status(400)
                .json({ message: "Invalid password or passwordToCompare" });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = await createAccessToken({ id: userFound._id });

        res.cookie("token", token);
        res.json({
            id: userFound._id,
            userName: userFound.userName,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server",
            error: error,
        });
    }
};

const logOut = async (req: Request, res: Response) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

const profile = async (req: AuthRequest, res: Response) => {
    const userFound = await User.findById(req.user?.id);

    if (!userFound) {
        return res.status(400).json({ message: "User not found" });
    }
    return res.json({
        id: userFound._id,
        userName: userFound.userName,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
};

export { register, login, logOut, profile };
