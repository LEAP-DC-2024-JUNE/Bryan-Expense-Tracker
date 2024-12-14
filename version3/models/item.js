const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ceatedDate: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("Item", itemSchema);
