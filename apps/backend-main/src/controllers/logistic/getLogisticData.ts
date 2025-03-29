import { NextFunction, Request, Response } from "express";

const getLogisticData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    res.status(200).json({
      status: "success",
      percentages: "",
      message: "location Successfully created",
    });
    return;
  } catch (error) {
    next(error);
  }
};

export default getLogisticData;
