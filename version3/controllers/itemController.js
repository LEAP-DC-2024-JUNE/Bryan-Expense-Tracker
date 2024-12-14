const Item = require("../models/item");

// Create item
exports.createItem = async (request, response) => {
  try {
    const item = new Item(request.body);
    const savedItem = await item.save();
    response.status(201).json(savedItem);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
// Read all items
exports.getAllItems = async (request, response) => {
  try {
    const items = await Item.find();
    response.json(items);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
// Read single item
exports.getItemById = async (request, response) => {
  try {
    const id = request.params.id;
    const item = await Item.findById(id);

    if (!item) {
      response.status(404).json({ error: "Item not found" });
    }
    response.json(item);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
// Update item
exports.updateItem = async (request, response) => {
  try {
    const id = request.params.id;
    const updatedItem = await Item.findByIdAndUpdate(id, request.body);
    if (!updatedItem) {
      response.status(404).json({ error: "Item not found" });
    }
    response.json(updatedItem);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
// Delete item
exports.deleteItem = async (request, response) => {
  try {
    const id = request.params.id;
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      response.status(404).json({ error: "Item not found" });
    }
    response.json(deletedItem);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
