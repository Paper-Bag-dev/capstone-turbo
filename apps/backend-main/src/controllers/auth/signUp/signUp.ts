import { NextFunction, Request, Response } from "express";
import User from "../../../models/user";
import bcrypt from "bcrypt";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        success: false,
        field: !username ? "username" : !email ? "email" : "password",
        message: "Please fill all the fields",
      });
      return;
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res
        .status(400)
        .json({ success: false, message: "Email already registered." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Created",
    });
    return;
  } catch (error) {
    next({ error, location: "signUp.ts -> signUp()" });
  }
};

export default signUp;
