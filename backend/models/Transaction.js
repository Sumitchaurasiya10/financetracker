import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  amount: { type: Number, required: true }, // positive number; use `type` to separate income/expense
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, required: true, trim: true },
  paymentMethod: { type: String, enum: ["cash", "card", "upi", "bank"], default: "cash" },
  date: { type: Date, default: Date.now },
  // Bonus features
  isRecurring: { type: Boolean, default: false },
  tags: [{ type: String }],
  currency: { type: String, default: "INR" },
  budgetLimit: { type: Number }, // optional: budget for this category/transaction
  exceededBudget: { type: Boolean, default: false },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
