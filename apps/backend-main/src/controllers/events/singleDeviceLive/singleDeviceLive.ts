import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import DeviceModel from "../../../models/deviceModel";

export const singleDeviceLive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deviceId = req.query.deviceId as string;

    if (!mongoose.Types.ObjectId.isValid(deviceId)) {
      res.status(400).send("Invalid deviceId");
      return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    // Function to fetch and send the latest data
    const sendLatestData = async () => {
      const latestData = await DeviceModel.findOne({ deviceId })
        .sort({ timestamp: -1 }) // Get the most recent data
        .lean();

      if (latestData) {
        const { temperature, humidity, particlePerMillion } = latestData;
        const data = { temperature, humidity, ppm: particlePerMillion };

        res.write(`data: ${JSON.stringify(data)}\n\n`);
      }
    };

    await sendLatestData();

    // Poll every 2 seconds
    const interval = setInterval(async () => {
        await sendLatestData();
    }, 2000);

    req.on("close", () => {
      clearInterval(interval);
      res.end();
    });
  } catch (error) {
    next(error);
  }
};
