import express from "express";
import addDevice from "../../controllers/device/addDevice/addDevice";
import getAllDevice from "../../controllers/device/getAllDevice/getAllDevice";

const router = express.Router();

router.post("/add-device", addDevice);
router.post("/get-devices", getAllDevice);

export default router;