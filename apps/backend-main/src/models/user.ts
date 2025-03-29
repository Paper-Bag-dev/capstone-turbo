import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  role?: string;
  googleId?: string;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: {
      type: String,
      required: function () {
        return this.role !== "google";
      },
      select: false,
    },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: false, default: "user" },
    googleId: { type: String, unique: true, sparse: true }, 
  },
  { timestamps: true }
);

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
