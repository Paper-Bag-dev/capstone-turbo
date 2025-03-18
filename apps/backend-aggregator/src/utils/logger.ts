import path from "path";
import winston from "winston";
import "winston-daily-rotate-file";

const logDir = path.join(__dirname, "../logs/devices");

// Configure rotating file transport
const transport = new winston.transports.DailyRotateFile({
    dirname: logDir,
    filename: "%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: false,
    maxSize: "10m",
    maxFiles: "30d",
});

// Create Winston logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [transport],
});

// Function to log unregistered device data
export const logUnregisteredDevice = (deviceData: any) => {
    logger.info({
        event: "UNREGISTERED_DEVICE",
        timestamp: new Date().toISOString(),
        deviceId: deviceData.id,
        location: deviceData.location || "Unknown",
        humidity: deviceData.humidity,
        temperature: deviceData.temperature,
        particlePerMillion: deviceData.particlePerMillion,
    });
};
