import express from "express";
import signRouter from "./routes/auth"
import deviceRouter from "./routes/device"
import locationRouter from "./routes/location"
import analyticsRouter from "./routes/analytics"
import eventsRouter from "./routes/events"

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello From Backend Router ~ <3");
});

router.use("/auth", signRouter);
router.use("/device", deviceRouter); 
router.use("/location", locationRouter); 
router.use("/analytics", analyticsRouter); 
router.use("/events", eventsRouter);
export default router;