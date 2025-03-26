import express from "express";
import addLocation from "../../controllers/location/addLocation/addLocation";
import getLocation from "../../controllers/location/getLocation/getLocation";

const router = express.Router();


router.post("/add-location" , addLocation);
router.post("/get-location" , getLocation);

export default router;