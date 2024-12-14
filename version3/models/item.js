const mongoose = require("mongoose");
const user = require("./user");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdDate: { type: Date, required: true, default: Date.now },
  userId: { type: mongoose.SchemaType.ObjectId, ref: user },
});

module.exports = mongoose.model("Item", itemSchema);
