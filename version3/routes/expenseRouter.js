const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

// Creeate an expense
router.post("", expenseController.createExpense);
// Read all expenses
router.get("", expenseController.getAllExpenses);
// Read single expense
router.get("/:id", expenseController.getExpenseById);
// Update an expense
router.put("/:id", expenseController.updateExpense);
// Delete an expense
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
