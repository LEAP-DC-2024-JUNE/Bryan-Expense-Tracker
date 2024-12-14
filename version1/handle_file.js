const fs = require("fs");

filepath = "./data/data.json";

const addData = (expense) => {
  const data = getData();
  // Find the greatest id and add 1
  const newId = data.reduce((a, b) => (a.id > b.id ? a : b)).id + 1;
  data.push({
    id: newId,
    date: expense.date,
    description: expense.description,
    type: expense.type,
    amount: parseFloat(expense.amount),
  });
  fs.writeFileSync(filepath, JSON.stringify(data));
};

const getData = () => {
  return JSON.parse(fs.readFileSync(filepath, "utf-8"));
};

const getOneData = (id) => {
  const data = getData();
  return data.find((item) => item.id === id);
};

const changeData = (id, expense) => {
  const data = getData();
  let selectedItem = data.find((item) => item.id === id);
  if (selectedItem) {
    selectedItem.date = expense.date;
    selectedItem.description = expense.description;
    selectedItem.type = expense.type;
    selectedItem.amount = expense.amount;
    fs.writeFileSync(filepath, JSON.stringify(data));
    return 0;
  } else {
    return 1;
  }
};

const deleteData = (id) => {
  const data = getData();
  const index = data.findIndex((expense) => expense.id === id);
  if (index === -1) {
    return 1;
  } else {
    data.splice(index, 1);
    fs.writeFileSync(filepath, JSON.stringify(data));
    return 0;
  }
};

module.exports = { addData, getData, getOneData, changeData, deleteData };
