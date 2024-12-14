const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: { type: String },
});

module.exports = mongoose.model("users", usersSchema);
