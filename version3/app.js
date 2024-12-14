const express = require("express");
const cors = require("cors");
const connectMongoDB = require("./configs/mongo-db");
const dotenv = require("dotenv").config({ path: "./configs/.env" });
const Item = require("./models/item");

const PORT = "8000";

const itemRouter = require("./routes/itemRouter");
const expenseRouter = require("./routes/expenseRouter");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/items", itemRouter);
app.use("/api/expenses", expenseRouter);

connectMongoDB();

app.listen(PORT, () => console.log(`Started listening on port ${PORT}.`));
