import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import DeviceModel from "../../../models/deviceModel";

export const liveData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.query.userId as string;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).send("Invalid userId");
      return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    // Function to fetch and send aggregated data
    const sendAggregatedData = async () => {
      const rawData = await DeviceModel.find({ userId })
        .sort({ timestamp: -1 })
        .limit(10)
        .lean();

      if (rawData.length > 0) {
        const avgTemperature =
          rawData.reduce((sum, d) => sum + d.temperature, 0) / rawData.length;
        const avgHumidity =
          rawData.reduce((sum, d) => sum + d.humidity, 0) / rawData.length;
        const avgPPM =
          rawData.reduce((sum, d) => sum + d.particlePerMillion, 0) /
          rawData.length;

        const aggregatedData = { avgTemperature, avgHumidity, avgPPM };

        res.write(`data: ${JSON.stringify(aggregatedData)}\n\n`);
      }
    };

    await sendAggregatedData();

    // Poll every 2 seconds
    const interval = setInterval(async () => {
      await sendAggregatedData();
    }, 2000);

    req.on("close", () => {
      clearInterval(interval);
      res.end();
    });
  } catch (error) {
    next(error);
  }
};
