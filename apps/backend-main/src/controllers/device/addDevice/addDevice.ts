import MicroControllerModel from "../../../models/microController";
import { NextFunction, Request, Response } from "express";

const addDevice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const device = await MicroControllerModel.create({
      deviceName: data.deviceName,
      userId: data.userId,
      location: {
        id: data.location.id,
        name: data.location?.name,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
      },
    });

    res.status(200).json({
        status: "success",
        mongo_id: device._id,
        message: "Device Successfully created"
    });
    return;
  } catch (error) {
    next({ error, location: "addDevice.ts -> addDevice()" });
  }
};

export default addDevice;