const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true, maxLength: 1500 },
})

ManufacturerSchema.virtual("url").get(function () {
    return `/store/manufacturer/${this._id}`;
});


module.exports = mongoose.model("Manufacturer", ManufacturerSchema);
