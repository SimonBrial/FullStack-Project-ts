import { Schema, model } from "mongoose";

const Task = new Schema(
    {
        title: {
            type: String,
            require: true,
            trim: true,
        },
        description: {
            type: String,
            require: true,
        },
        date: {
            type: Date,
            default: Date.now(),
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default model("Task", Task);
