const cors = require("cors");
const express = require("express");
const app = express();
const PORT = 8000;

const expensesRouter = require("./routes/expenses");

app.use(cors());
app.use(express.json());
app.use("/api/expenses", expensesRouter);

app.listen(PORT, () => console.log("Server started on port " + PORT));
