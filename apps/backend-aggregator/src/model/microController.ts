import { Schema, model, Document } from "mongoose";

export interface IMicroController extends Document {
  deviceId: string;
  userId: Schema.Types.ObjectId;
  location: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
  };
  humidity: number;
  temperature: number;
  particlePerMillion: number;
  timestamp: string;
}

const microControllerSchema = new Schema<IMicroController>({
  deviceId: { type: String, required: true, unique: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
  }
});

const MicroControllerModel = model<IMicroController>(
  "microController",
  microControllerSchema
);

export default MicroControllerModel;
