import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    role?: string;
}

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true },
        password: { type: String, required: true, select: false },
        email: { type: String, required: true, unique: true },
        role: { type: String, required: false, default: "user" }
    },
    { timestamps: true }
);

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
