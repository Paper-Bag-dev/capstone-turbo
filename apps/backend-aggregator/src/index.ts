import express from "express";
import { config } from "dotenv";
import { connectDB } from "./db/connect";
import MicroControllerModel from "./model/microController";
import { logUnregisteredDevice } from "./utils/logger";
import DeviceModel from "./model/deviceModel";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: [ "POST"],
}));

config({
  path: ".env",
});

app.post("/hook/v1/data", async (req, res) => {
  try {
    const data = req.body;
    console.log("Data received", data.deviceName);
    const device = await MicroControllerModel.findOne({
      deviceName: data.deviceName,
    });


    if (!device) {
      logUnregisteredDevice(data);
      res.status(400).json({ message: "Device not registered" });
      return;
    }

    // Call Aggregation Validation fn?

    await DeviceModel.create({
      deviceName: data.deviceName,
      userId: device.userId,
      microControllerId: device._id,
      humidity: data.humidity,
      temperature: data.temperature,
      particlePerMillion: data.particlePerMillion,
    });

    res.json({
      message: "Data Received",
      data: data,
    });
  } catch (error) {
    console.log("Error Backend Aggregator!: ", error);
  }
});

const PORT = process.env.PORT || 5001;

const initWebHook = async () => {
  await connectDB(process.env.MONGO_URI as string)
    .then(() => {
      app.get("/", (req, res) => {
        res.send("Hello World!");
      });

      app.listen(PORT, () => {
        console.log("Server Listening on Port: ", PORT);
      });
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err);
    });
};

initWebHook();
