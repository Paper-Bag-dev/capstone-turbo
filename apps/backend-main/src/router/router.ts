import express from "express";
import signRouter from "./routes/auth"
import deviceRouter from "./routes/device"

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello From Backend Router ~ <3");
});

router.use("/auth", signRouter);
router.use("/device", deviceRouter);

export default router;