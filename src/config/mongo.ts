import "dotenv/config";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log(">>> DB is connected");
    } catch (err) {
        console.log(err);
    }
};

export { connectDB };
