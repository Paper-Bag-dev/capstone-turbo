import { Types } from "mongoose";
import MicroControllerModel from "../../../models/microController";
import { NextFunction, Request, Response } from "express";

const addDevice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const device = await MicroControllerModel.create({
      deviceName: data.deviceName,
      userId: new Types.ObjectId(String(data.userId)),
      location: {
        id: new Types.ObjectId(String(data.id)),
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });

    res.status(200).json({
        status: "success",
        mongo_id: device._id,
        message: "Device Successfully created"
    });
    return;
  } catch (error) {
    console.log(error);
    const err = new Error("Database error while adding device");
    (err as any).originalError = error;
    (err as any).location = "addDevice.ts -> addDevice()";
    next(err);  
    }
};

export default addDevice;