import LocationModel from "../../../models/location";
import { NextFunction, Request, Response } from "express";
import UserModel from "../../../models/user";

const addLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    console.log("data");
    console.log(data);

    const user = await UserModel.findById(data.id);

    if(!user){
      res.status(404).json({
        status: "failed",
        message: "User not found with this ID"
      })
      return;
    }

    const location = await LocationModel.create({
      userId: user._id,
      locationName: data.locationName,
      latitude: data?.latitude,
      longitude: data?.longitude,
    });


    res.status(200).json({
      status: "success",
      mongo_id: location._id,
      message: "location Successfully created",
    });
    return;
  } catch (error) {
    next({ error, location: "addLocation.ts -> addLocation()" });
  }
};

export default addLocation;
