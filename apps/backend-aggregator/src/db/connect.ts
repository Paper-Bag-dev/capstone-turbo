import mongoose from "mongoose";
import { createTimeSeriesCollection } from "../utils/createTimeseries";

export async function connectDB(url:string) {
    try {
        const connection = await mongoose.connect(url, { dbName: "Capstone-test" });
        console.log("Connected to DB");
        // await createTimeSeriesCollection();
        return connection;
    } catch (err) {
        console.error("Database connection error:", err);
    }
}