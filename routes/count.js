import express from "express";
import { addVisitor } from "../controllers/count.js"

const router = express.Router();

// * READ *//
// router.get("/", getCount);

// * UPDATED * //
router.get("/", addVisitor);

export default router;