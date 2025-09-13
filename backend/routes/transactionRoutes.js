import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction
} from "../controllers/transactionController.js";
import { getSummary } from "../controllers/dashboardController.js";

const router = express.Router();

// Protected routes
router.get("/summary/data", protect, getSummary);

router.route("/")
  .get(protect, getTransactions)
  .post(protect, addTransaction);

router.route("/:id")
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

export default router;
