const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model("Expense", expenseSchema);
