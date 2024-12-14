const express = require("express");
const router = express.Router();
const {
  addData,
  getData,
  getOneData,
  changeData,
  deleteData,
} = require("../handle_file");

router.post("", (request, response) => {
  addData(request.body);
  response.status(201).json({ message: "Expense added." });
});

router.get("", (request, response) => {
  const data = getData();
  response.json(data);
});

router.get("/:id", (request, response) => {
  const selectedItem = getOneData(parseInt(request.params.id));
  if (selectedItem) {
    console.log(selectedItem);
    response.json(selectedItem);
  } else {
    response.status(404).json({ message: "Expense not found." });
  }
});

router.put("/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const result = changeData(id, request.body);
  if (result === 0) {
    response.json({ message: "Expense updated." });
  } else {
    response.status(404).json({ message: "Expense not found." });
  }
});

router.delete("/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const result = deleteData(id);
  if (result === 0) {
    response.json({ message: "Expense deleted." });
  } else {
    response.status(404).json({ message: "Expense not found." });
  }
});

module.exports = router;
