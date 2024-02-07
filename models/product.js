const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, min: 0, max: 4000, required: true },
    manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer", required: true },
    quantity: { type: Number, min: 0, max: 4000, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: "Category", required: true }],
    location: [{ type: Schema.Types.ObjectId, ref: "Location", required: true }],
    img: { type: Buffer, required: true }
})

ProductSchema.virtual("url").get(function () {
    return `/store/product/${this._id}`;
});


module.exports = mongoose.model("Product", ProductSchema);