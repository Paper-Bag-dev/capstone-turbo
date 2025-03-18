import { Request, Response, NextFunction } from "express";

interface CustomError {
    error: any;
    location?: string;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(`ERROR at: ${err.location || "Unknown location"}`);
    console.error(err.error);

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.error?.message || "Something went wrong",
        location: err.location || "Unknown location",
    });
};

export default errorHandler;
