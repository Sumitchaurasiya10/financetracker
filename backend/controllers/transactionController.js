import Transaction from "../models/Transaction.js";

/**
 * GET /api/transactions
 * Supports query filters:
 *  - category, type, paymentMethod, tag
 *  - startDate, endDate (ISO date strings)
 */
export const getTransactions = async (req, res) => {
  try {
    const { category, type, paymentMethod, tag, filter, date, month, year } = req.query;
    const query = { user: req.user._id };

    if (category) query.category = category;
    if (type) query.type = type;
    if (paymentMethod) query.paymentMethod = paymentMethod;
    if (tag) query.tags = tag;

    // Day / Month / Year filter
    if (filter === "day" && date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      query.date = { $gte: start, $lt: end };
    }
    if (filter === "month" && month && year) {
      query.date = {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1)
      };
    }
    if (filter === "year" && year) {
      query.date = {
        $gte: new Date(year, 0, 1),
        $lt: new Date(Number(year) + 1, 0, 1)
      };
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.error("Get transactions error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/transactions
export const addTransaction = async (req, res) => {
  const {
    title,
    description,
    amount,
    type,
    category,
    paymentMethod,
    date,
    isRecurring,
    tags,
    currency,
    budgetLimit
  } = req.body;

  try {
    if (!title || amount == null || !type || !category) {
      return res.status(400).json({ message: "title, amount, type, category are required" });
    }

    let exceededBudget = false;
    if (budgetLimit != null && Number(amount) > Number(budgetLimit)) exceededBudget = true;

    const transaction = await Transaction.create({
      title,
      description,
      amount,
      type,
      category,
      paymentMethod,
      date: date ? new Date(date) : undefined,
      isRecurring,
      tags,
      currency,
      budgetLimit,
      exceededBudget,
      user: req.user._id
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Add transaction error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/transactions/:id
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    if (transaction.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });

    // If updating budgetLimit or amount, recompute exceededBudget
    const updatedBody = { ...req.body };
    if (updatedBody.budgetLimit != null) {
      const amt = updatedBody.amount != null ? Number(updatedBody.amount) : Number(transaction.amount);
      updatedBody.exceededBudget = amt > Number(updatedBody.budgetLimit);
    } else if (updatedBody.amount != null && transaction.budgetLimit != null) {
      updatedBody.exceededBudget = Number(updatedBody.amount) > Number(transaction.budgetLimit);
    }

    const updated = await Transaction.findByIdAndUpdate(req.params.id, updatedBody, { new: true });
    res.json(updated);
  } catch (error) {
    console.error("Update transaction error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/transactions/:id
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    if (transaction.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });

    await transaction.deleteOne();
    res.json({ message: "Transaction removed" });
  } catch (error) {
    console.error("Delete transaction error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
