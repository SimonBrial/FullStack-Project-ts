import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequestToken } from "../interface/interface";

const authRequired = (req: AuthRequestToken, res: Response, next: NextFunction) => {
    const tokenSecret = process.env.JWT_SECRET_KEY;
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            message: "No Token, Authorization denied.",
        });
    }

    if (tokenSecret) {
        const userDecoded = jwt.verify(token, tokenSecret!);
        if (!userDecoded) {
            res.status(403).json({
                message: "Invalid Token",
            });
        }
        req.user = userDecoded;
        next();
    }
};

export { authRequired };
