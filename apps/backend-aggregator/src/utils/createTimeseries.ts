import mongoose from "mongoose";

export async function createTimeSeriesCollection() {
    try {
        if (!mongoose.connection.readyState) {
            throw new Error(" Mongoose is not connected. Cannot create time-series collection.");
        }
        
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error("MongoDB native driver is not available.");
        }
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(col => col.name === "devices");

        if (!collectionExists) {
            await db.createCollection("devices", {
                timeseries: {
                    timeField: "timestamp",  // Required: main time field
                    metaField: "metadata",   // Optional: additional metadata
                    granularity: "minutes"   // Optimized for minute-level updates
                }
            });
            console.log("Time-Series Collection 'devices' created.");
        } else {
            console.log("Time-Series Collection 'devices' already exists.");
        }
    } catch (err) {
        console.error("Error creating time-series collection:", err);
    }
}
