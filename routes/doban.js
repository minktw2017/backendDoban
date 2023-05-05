import express from "express";
import { getDoban, getOneDoban } from "../controllers/doban.js"

const router = express.Router();

// * READ ALL *//
router.get("/", getDoban);
router.get("/:id", getOneDoban);

export default router;