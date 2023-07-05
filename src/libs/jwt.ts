import jwt from "jsonwebtoken";
import { Payload } from "../interface/interface";

function createAccessToken(payload: Payload) {
    const secretKey = process.env.JWT_SECRET_KEY;
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            secretKey!,
            {
                expiresIn: "2h",
            },
            (err, token) => {
                if (err) return reject(err);
                resolve(token);
            },
        );
    })
}

export default createAccessToken;
