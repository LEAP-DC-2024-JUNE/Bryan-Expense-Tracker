const Expense = require("../models/expense");

// Create an expense
exports.createExpense = async (request, response) => {
  try {
    const expense = new Expense(request.body);
    const savedExpense = await expense.save();
    response.status(201).json(savedExpense);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
// Read all expenses || Read paginated expenses
exports.getAllExpenses = async (request, response) => {
  try {
    const { page, limit = 5 } = request.query;
    if (page) {
      const expenses = await Expense.find()
        .sort({ date: -1 })
        .limit(5)
        .skip((page - 1) * limit)
        .exec();
      const numberOfExpenses = await Expense.countDocuments();
      const totalPages = Math.ceil(numberOfExpenses / limit);
      response.json({ expenses: expenses, totalPages: totalPages });
    } else {
      const expenses = await Expense.find().sort({ date: -1 });
      response.json(expenses);
    }
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
// Read single expense
exports.getExpenseById = async (request, response) => {
  try {
    const id = request.params.id;
    const expense = await Expense.findById(id);

    if (!expense) {
      response.status(404).json({ error: "Expense not found" });
    }
    response.json(expense);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
// Update an expense
exports.updateExpense = async (request, response) => {
  try {
    const id = request.params.id;
    const updatedItem = await Expense.findByIdAndUpdate(id, request.body);

    if (!updatedItem) {
      response.status(404).json({ error: "Expense not found" });
    }
    response.json(updatedItem);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
// Delete an expense
exports.deleteExpense = async (request, response) => {
  try {
    const id = request.params.id;
    const deletedItem = await Expense.findByIdAndDelete(id);

    if (!deletedItem) {
      response.status(404).json({ error: "Expense not found" });
    }
    response.json(deletedItem);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
