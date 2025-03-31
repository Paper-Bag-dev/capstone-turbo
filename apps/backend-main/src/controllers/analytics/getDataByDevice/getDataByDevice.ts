import { NextFunction, Request, Response } from "express";
import DeviceModel from "../../../models/deviceModel";
import { Types } from "mongoose";
import MicroControllerModel from "../../../models/microController";

export const getDataByDevice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { deviceId, startDate, endDate } = req.body;

    if (!deviceId || !startDate || !endDate) {
      res.status(400).json({
        success: false,
        message: "Missing required parameters",
        data: [],
      });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      res
        .status(400)
        .json({ success: false, message: "Invalid date range", data: [] });
      return;
    }

    const microController = await MicroControllerModel.findById(deviceId);

    if (!microController) {
      res.status(400).json({
        status: false,
        message: "Device Doesnt exist!",
      });
      return;
    }

    const deviceData = await DeviceModel.find({
      deviceName: microController.deviceName,
    });

    // Ensure data is always an array

    const timeSeriesData = deviceData.map((device) => ({
      timestamp: device.timestamp,
      humidity: device.humidity,
      temperature: device.temperature,
      ppm: device.particlePerMillion,
    }));

    res.json({ success: true, data: timeSeriesData });
  } catch (error) {
    next(error);
  }
};
