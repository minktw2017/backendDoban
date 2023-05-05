import express from "express";
import { addGuest } from "../controllers/guests.js";

const router = express.Router();

router.get("/add", addGuest);

export default router;