import express from "express";
import addDevice from "../../controllers/device/addDevice/addDevice";

const router = express.Router();

router.post("/add-device", addDevice);

export default router;