import { NextFunction, Request, Response } from "express";
import User from "../../../models/user";
import { sendUsercookie } from "../../../middlewares/authentication";

export const signInGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username, googleId } = req.body;

    if (!email || !googleId) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }

    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.findOne({ email });

      if (user) {
        user.googleId = googleId;
        await user.save();
      } else {
        user = await User.create({
          email,
          username,
          googleId,
          role: "google",
        });
      }
    }

    sendUsercookie(user, res, "User Logged In via Google Successfully", 200);
    return;
  } catch (error) {
    next({ error, location: "signInGoogle.ts -> signInGoogle()" });
  }
};
