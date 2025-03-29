import { Types } from "mongoose";
import MicroControllerModel from "../../../models/microController";
import { NextFunction, Request, Response } from "express";

const getAllDevice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {userId} = req.body;

    const devices = await MicroControllerModel.find({
        userId: new Types.ObjectId(String(userId)),
    });

    res.status(200).json({
        status: true,
        devices
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

export default getAllDevice;