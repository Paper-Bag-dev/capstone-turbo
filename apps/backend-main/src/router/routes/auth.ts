import express from "express";
import signUp from "../../controllers/auth/signUp/signUp";
import signIn from "../../controllers/auth/signIn/signIn";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;