const express = require("express");
const router = express.Router();
const db = require("../database");
const moment = require("moment");

const parseResult = (result) => {
  let expenses = result.map((expense) => {
    const { id, date, description, type, amount } = expense;

    return {
      id: id,
      date: moment(date).format("YYYY-MM-DD"),
      description: description,
      type: type,
      amount: parseFloat(amount),
    };
  });
  return expenses;
};

// Create
router.post("", (request, response) => {
  console.log(request.body);
  const { date, description, type, amount } = request.body;
  let typeId = parseInt(type);
  const sql =
    "INSERT INTO tb_expenses (c_date, c_description, fk_expense_type, c_amount) VALUES (?, ?, ?, ?)";
  db.query(sql, [date, description, typeId, amount], (err, result) => {
    if (err) {
      console.log("Error occured while inserting a new expense.");
      response.status(500).json({ message: err.message });
    }
    response.status(201).json({ message: "Expense is added." });
  });
});

// Read all
router.get("", (request, response) => {
  const { page = 1, limit = 5 } = request.query;
  const offset = (page - 1) * limit;
  let totalPages = 1;

  db.query("SELECT COUNT(*) AS count FROM tb_expenses", (err, result) => {
    if (err) {
      console.log("Error occured while counting expenses.");
      response.status(500).json({ message: err.message });
    }
    const totalExpenses = result[0].count;
    totalPages = Math.ceil(totalExpenses / limit);
    const sql = `SELECT 
        exp.pk_id AS id,
        exp.c_date AS date,
        exp.c_description AS description,
        tp.c_type AS type,
        exp.c_amount AS amount
      FROM tb_expenses exp
      INNER JOIN tb_expense_types tp
      ON exp.fk_expense_type = tp.pk_id
      ORDER BY c_date DESC LIMIT ${limit} OFFSET ${offset}`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured while reading all expenses.");
        response.status(500).json({ message: err.message });
      }
      const expenses = parseResult(result);
      response.json({
        expenses: expenses,
        totalPages: totalPages,
      });
    });
  });
});

// Read by year
router.get("/year/:year", (request, response) => {
  const year = parseInt(request.params.year);
  const sql = `SELECT
      exp.pk_id AS id,
      exp.c_date AS date,
      exp.c_description AS description,
      tp.c_type AS type,
      exp.c_amount AS amount
    FROM tb_expenses exp
    INNER JOIN tb_expense_types tp
    ON exp.fk_expense_type = tp.pk_id
    WHERE YEAR(exp.c_date) = ?`;
  db.query(sql, [year], (err, result) => {
    if (err) {
      console.log("Error occured while reading expense by year.");
      response.status(500).json({ message: err.message });
    }
    const expenses = parseResult(result);
    response.json(expenses);
  });
});

// Read single
router.get("/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const sql = "SELECT * FROM tb_expenses WHERE pk_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Error occured while reading a single expense.");
      response.status(500).json({ message: err.message });
    }
    const expenses = parseResult(result);
    response.json(expenses[0]);
  });
});

// Update
router.put("/:id", (request, response) => {
  const id = request.params.id;
  const { date, description, type, amount } = request.body;
  let typeId = parseInt(type);
  const sql =
    "UPDATE tb_expenses SET c_date = ?, c_description = ?, fk_expense_type = ?, c_amount = ? WHERE pk_id = ?";
  db.query(sql, [date, description, typeId, amount, id], (err, result) => {
    if (err) {
      console.log("Error occured while updating an expense.");
      response.status(500).json({ message: err.message });
    }
    response.json({ message: "Expense updated." });
  });
});

// Delete
router.delete("/:id", (request, response) => {
  const id = request.params.id;
  const sql = "DELETE FROM tb_expenses WHERE pk_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Error occured while deleting an expense.");
      response.status(500).json({ message: err.message });
    }
    response.json({ message: "Expense deleted." });
  });
});

module.exports = router;
