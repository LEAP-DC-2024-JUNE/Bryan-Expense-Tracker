const express = require("express");
const app = express();
const cors = require("cors");
const expenseRouter = require("./routes/expenses");

app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenseRouter);

app.listen(8000, () => console.log("Started listening on port 8000..."));
