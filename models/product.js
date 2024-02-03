const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, min: 0, max: 4000, required: true },
    producer: { type: Schema.Types.ObjectId, ref: "Producer", required: true },
    category: [{ type: Schema.Types.ObjectId, ref: "Category", required: true }],
    location: [{ type: Schema.Types.ObjectId, ref: "Location", required: true }],
    img: { type: Buffer, required: true }
})

ProductSchema.virtual("url").get(function () {
    return `/product/${this._id}`;
});


module.exports = mongoose.model("Product", ProductSchema);