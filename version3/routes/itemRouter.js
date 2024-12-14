const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// Create item
router.post("", itemController.createItem);
// Read all items
router.get("", itemController.getAllItems);
// Read single item
router.get("/:id", itemController.getItemById);
// Update item
router.put("/:id", itemController.updateItem);
// Delete item
router.delete("/:id", itemController.deleteItem);

module.exports = router;
