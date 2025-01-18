import express from "express";
import { createSource, getSources } from "../controllers/sourceController.js";

const router = express.Router();

router.post("/", createSource);
router.get("/", getSources);

export default router;
