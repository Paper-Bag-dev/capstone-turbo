import { NextFunction, Request, Response } from "express";
import DeviceModel from "../../../models/deviceModel";
import { Types } from "mongoose";
import UserModel from "../../../models/user";

export const getData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      const user = await UserModel.findById(new Types.ObjectId(String(userId)));
      if (!user) {
        res.status(401).json({
          success: false,
          message: "User Doesn't Exist",
        });
        return;
      }
  
      // Get all device data for the user
      const devicesData = await DeviceModel.find({
        userId: new Types.ObjectId(String(userId)),
      });
  
      if (!devicesData.length) {
        res.json({ success: true, message: "No device data found" });
        return;
      }
  
      // Group data by day
      const groupedData: Record<string, any> = {};
  
      devicesData.forEach((device) => {
        const dateKey = device.timestamp.toISOString().split("T")[0] as string; // Extract YYYY-MM-DD
        if (!groupedData[dateKey]) {
          groupedData[dateKey] = {
            humidity: [],
            temperature: [],
            particlePerMillion: [],
          };
        }
  
        groupedData[dateKey].humidity.push(device.humidity);
        groupedData[dateKey].temperature.push(device.temperature);
        groupedData[dateKey].particlePerMillion.push(device.particlePerMillion);
      });
  
      // Compute mean and min-max range for each day
      const processedData = Object.entries(groupedData).map(([date, values]) => ({
        date,
        avgHumidity: values.humidity.reduce((a:number, b:number) => a + b, 0) / values.humidity.length,
        avgTemperature: values.temperature.reduce((a:number, b:number) => a + b, 0) / values.temperature.length,
        avgPPM: values.particlePerMillion.reduce((a:number, b:number) => a + b, 0) / values.particlePerMillion.length,
        minHumidity: Math.min(...values.humidity),
        maxHumidity: Math.max(...values.humidity),
        minTemperature: Math.min(...values.temperature),
        maxTemperature: Math.max(...values.temperature),
        minPPM: Math.min(...values.particlePerMillion),
        maxPPM: Math.max(...values.particlePerMillion),
      }));
  
      res.json({
        success: true,
        data: processedData,
      });
      return;
    } catch (error) {
      next(error);
      return;
    }
  };
  
