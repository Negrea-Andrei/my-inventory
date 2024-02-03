const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProducerSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true, maxLength: 100 },
})

ProducerSchema.virtual("url").get(function () {
    return `/store/producer/${this._id}`;
});


module.exports = mongoose.model("Producer", ProducerSchema);