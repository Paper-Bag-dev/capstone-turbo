import jwt from "jsonwebtoken";
import { Response } from "express";
import { IUser } from "../models/user";


export const sendUsercookie = (
  user: IUser,
  res: Response,
  message: string,
  statusCode = 200
) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "30m",
  });
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 30 * 60 * 1000,
    })
    .json({
      success: true,
      message,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  return;
};