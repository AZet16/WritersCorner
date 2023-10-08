import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router(); // use express to configure routes
router.post("/login", login);

export default router;