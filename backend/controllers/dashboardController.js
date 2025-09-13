import Transaction from "../models/Transaction.js";

/**
 * GET /api/transactions/summary/data
 * Returns: income, expense, balance, categoryTotals
 */
export const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });

    const income = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = income - expense;

    // Spending by category (expenses only)
    const categoryTotals = {};
    transactions.forEach(t => {
      if (t.type === "expense") {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
      }
    });

    res.json({ income, expense, balance, categoryTotals });
  } catch (error) {
    console.error("Summary error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
