import { Schema, model, Document } from "mongoose";

export interface ILocation extends Document {
  userId: Schema.Types.ObjectId;
  locationName: string;
  latitude: number;
  longitude: number;
}

const locationSchema = new Schema<ILocation>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
});

const LocationModel = model<ILocation>(
  "location",
  locationSchema
);

export default LocationModel;
