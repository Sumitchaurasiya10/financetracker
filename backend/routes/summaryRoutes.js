import express from "express";
import { getTotalSummary, getCategorySummary, getMonthlySummary } from "../controllers/summaryController.js";
import  authMiddleware  from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/total", authMiddleware, getTotalSummary);
router.get("/categories", authMiddleware, getCategorySummary);
router.get("/monthly", authMiddleware, getMonthlySummary);

export default router;
