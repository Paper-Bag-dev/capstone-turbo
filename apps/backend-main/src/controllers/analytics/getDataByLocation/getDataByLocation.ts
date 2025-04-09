import { NextFunction, Request, Response } from "express";
import DeviceModel from "../../../models/deviceModel";
import { Types } from "mongoose";
import MicroControllerModel from "../../../models/microController";
import LocationModel from "../../../models/location";

export const getDataByLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;

    console.log("user: ", userId);
    const location = await LocationModel.findOne({userId: new Types.ObjectId(String(userId))});

    if(!location){
      res.status(404).json({
        status: false,
        message: "No Location Found"
      });
      return;
    }

    const microcontrollers = await MicroControllerModel.find({
      "location.id": new Types.ObjectId(String(location._id)),
    });

    const microcontrollerIds = microcontrollers.map((mc) => mc._id);

    const devices = await DeviceModel.find({
      microControllerId: { $in: microcontrollerIds },
    });

    if (!devices.length) {
      res.json({ success: true, message: "No device data found" });
      return;
    }

    const groupedData: Record<
      string,
      { humidity: number[]; temperature: number[]; ppm: number[] }
    > = {};
    devices.forEach((device) => {
      const dateKey = device.timestamp.toISOString().split("T")[0] as string;
      if (!groupedData[dateKey]) {
        groupedData[dateKey] = { humidity: [], temperature: [], ppm: [] };
      }
      groupedData[dateKey].humidity.push(device.humidity);
      groupedData[dateKey].temperature.push(device.temperature);
      groupedData[dateKey].ppm.push(device.particlePerMillion);
    });

    // Compute trends
    const processedData = Object.entries(groupedData).map(([date, values]) => ({
      date,
      avgHumidity:
        values.humidity.reduce((a, b) => a + b, 0) / values.humidity.length,
      avgTemperature:
        values.temperature.reduce((a, b) => a + b, 0) /
        values.temperature.length,
      avgPPM: values.ppm.reduce((a, b) => a + b, 0) / values.ppm.length,
      isDeteriorating:
        values.ppm.some((ppm) => ppm > 400) ||
        values.humidity.some((h) => h < 20),
    }));

    res.json({ success: true, processedData });
    return;
  } catch (error) {
    next(error);
  }
};
