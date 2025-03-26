import { Types } from "mongoose";
import LocationModel from "../../../models/location";
import { NextFunction, Request, Response } from "express";

const getLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const  { userId } = req.body;

    const locations = await LocationModel.find({userId: new Types.ObjectId(String(userId))});

    if(!locations){
        res.status(404).json({
            status: false,
            message: "No Locations exist!"
        })
        return;
    }

    res.status(200).json({
        status: true,
        message: "Found valid locations",
        locations
    })
  } catch (error) {
    next({ error, location: "getLocation.ts -> getLocation()" });
  }
};

export default getLocation;
