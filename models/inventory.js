const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
  location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true},
  quantity: { type: Number, default: 0},
});

InventorySchema.virtual("url").get(function () {
    return `/inventory/${this._id}`;
  });

module.exports = mongoose.model("Inventory", InventorySchema);
