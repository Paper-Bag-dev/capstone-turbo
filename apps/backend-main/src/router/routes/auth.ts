import express from "express";
import signUp from "../../controllers/auth/signUp/signUp";
import signIn from "../../controllers/auth/signIn/signIn";
import { signInGoogle } from "../../controllers/auth/google/signIn";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google/signin", signInGoogle);

export default router;
