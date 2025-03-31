import { Schema, model, Document } from "mongoose";

export interface IDeviceModel extends Document {
  deviceName: string;
  userId: Schema.Types.ObjectId;
  microControllerId: Schema.Types.ObjectId;
  humidity: number;
  temperature: number;
  particlePerMillion: number;
  timestamp: Date;
}

const deviceModelSchema = new Schema<IDeviceModel>({
  deviceName: { type: String, required: true, unique: false },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  microControllerId: { type: Schema.Types.ObjectId, ref: "microController", required: true },
  humidity: { type: Number, required: true },
  temperature: { type: Number, required: true },
  particlePerMillion: { type: Number, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
});

deviceModelSchema.index({ userId: 1, deviceName: 1, timestamp: -1 });

// Connect the model to the existing time-series collection
const DeviceModel = model<IDeviceModel>("devices", deviceModelSchema, "devices");

export default DeviceModel;
