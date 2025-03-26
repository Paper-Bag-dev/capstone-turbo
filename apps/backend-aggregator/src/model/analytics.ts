import { Schema, model, Document } from "mongoose";

export interface IAnalytics extends Document {
  userId: Schema.Types.ObjectId;
  locations: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
  }[]
  means: {
    humidity: number;
    temp: number;
    ppm: number;
  }[]
}

const analyticsSchema = new Schema<IAnalytics>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  locations: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  }],

  means: [{
    humidity: { type: Number, required: true },
    temp: { type: Number, required: true },
    ppm: { type: Number, required: true },
  }],
});

const AnalyticsModel = model<IAnalytics>(
  "analytics",
  analyticsSchema
);

export default AnalyticsModel;
