import mongoose from "mongoose";

export async function connectDB(url:string) {
    return mongoose.connect(url, {dbName : "Capstone-test"})
    .then(() => {
        console.log("Connected to DB")
    })
    .catch((err) => {
        console.log(err)
    });
}