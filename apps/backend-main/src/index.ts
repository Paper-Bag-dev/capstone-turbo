import express from "express";
import cors from "cors"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connect";
import router from "./router/router";

config({
    path: ".env",
});


const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL as string],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', router);

const PORT = process.env.PORT || 5000;

const initServer =  async () => {
    await connectDB(process.env.MONGO_URI as string)
    .then(() => {
        app.get("/", (req, res) => {
            res.send("Hello World!");
        });

        app.listen(PORT, () => {
            console.log("Server Listening on Port: ", PORT);
        })
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB:", err);
    });
}

initServer();
