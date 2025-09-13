import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

// Total income, expense, balance
export const getTotalSummary = async (req, res) => {
  const { filter, date, month, year } = req.query;
  const userId = req.user._id;

  let match = { user: userId };
  if (filter === "day" && date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    match.date = { $gte: start, $lt: end };
  }
  if (filter === "month" && month && year) {
    match.date = { $gte: new Date(year, month-1, 1), $lt: new Date(year, month, 1) };
  }
  if (filter === "year" && year) {
    match.date = { $gte: new Date(year, 0, 1), $lt: new Date(Number(year)+1, 0, 1) };
  }

  const income = await Transaction.aggregate([
    { $match: { ...match, type: "income" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);
  const expense = await Transaction.aggregate([
    { $match: { ...match, type: "expense" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  res.json({
    income: income[0]?.total || 0,
    expense: expense[0]?.total || 0,
    balance: (income[0]?.total || 0) - (expense[0]?.total || 0),
  });
};


// Category-wise totals
export const getCategorySummary = async (req, res) => {
  const { filter, date, month, year } = req.query;
  const userId = req.user._id;

  let match = { user: userId };
  if (filter === "day" && date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    match.date = { $gte: start, $lt: end };
  }
  if (filter === "month" && month && year) {
    match.date = { $gte: new Date(year, month-1, 1), $lt: new Date(year, month, 1) };
  }
  if (filter === "year" && year) {
    match.date = { $gte: new Date(year, 0, 1), $lt: new Date(Number(year)+1, 0, 1) };
  }

  const categories = await Transaction.aggregate([
    { $match: match },
    { $group: { _id: "$category", total: { $sum: "$amount" } } }
  ]);

  const result = {};
  categories.forEach(c => result[c._id] = c.total);
  res.json(result);
};


// Monthly trends for a given year
export const getMonthlySummary = async (req, res) => {
  const { filter, year, month } = req.query;
  const userId = req.user._id;

  let match = { user: userId };
  if (filter === "month" && month && year) {
    match.date = { $gte: new Date(year, month-1,1), $lt: new Date(year, month,1) };
  }
  if (filter === "year" && year) {
    match.date = { $gte: new Date(year,0,1), $lt: new Date(Number(year)+1,0,1) };
  }

  const data = await Transaction.aggregate([
    { $match: match },
    { $group: {
        _id: { month: { $month: "$date" }, type: "$type" },
        total: { $sum: "$amount" }
      }
    }
  ]);

  const result = {};
  data.forEach(d => {
    const m = d._id.month;
    if (!result[m]) result[m] = { month: m, income:0, expense:0 };
    result[m][d._id.type] = d.total;
  });

  res.json(Object.values(result));
};
