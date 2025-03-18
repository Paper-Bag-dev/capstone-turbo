import { NextFunction, Request, Response } from "express";
import User from "../../../models/user";
import bcrypt from "bcrypt";
import { sendUsercookie } from "../../../middlewares/authentication";

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    console.log("Received req: ", email, password);

    // Non existent Email or Password
    if (!email || !password) {
      res.status(400).json({
        success: false,
        field: !email ? "email" : "password",
        message: "All fields are required",
      });
      return;
    }

    // Search User
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User does not exist for this email",
      });
      return;
    }

    // Match Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
      return;
    }

    // Send Authenticated Cookie
    sendUsercookie(user, res, "User Logged In Successfully", 200);
    return;
  } catch (error) {
    next({ error, location: "signIn.ts -> signIn()" });
  }
};

export default signIn;
