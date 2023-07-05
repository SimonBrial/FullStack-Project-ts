import { Schema, model } from "mongoose";

const User = new Schema(
    {
        userName: {
            type: String,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default model("User", User);
