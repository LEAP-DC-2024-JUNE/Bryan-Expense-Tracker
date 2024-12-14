const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./configs/mongoDbConfig");
const authRouter = require("./routers/authRouter");
const morgan = require("morgan");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect DB
connectDb();

const app = express();
app.use(cors());
app.use(express.json());
// Morgan
app.use(morgan("dev"));
app.use("/api/auth", authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Started listening on port: ${PORT}`));
