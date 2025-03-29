import express from "express";
import { getData } from "../../controllers/analytics/getData/getData";
import { getDataByLocation } from "../../controllers/analytics/getDataByLocation/getDataByLocation";
import { getDataByDevice } from "../../controllers/analytics/getDataByDevice/getDataByDevice";

const router = express.Router();

router.post("/get-data" , getData);
router.post("/get-data-loc" , getDataByLocation);
router.post("/get-data-device" , getDataByDevice);

export default router;