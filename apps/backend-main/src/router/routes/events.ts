import express from "express";
import { liveData } from "../../controllers/events/liveData/liveData";
import { singleDeviceLive } from "../../controllers/events/singleDeviceLive/singleDeviceLive";

const router = express.Router();

router.get("/live-agg", liveData);
router.get("/live-single-dev", singleDeviceLive);

export default router;