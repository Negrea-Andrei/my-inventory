const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true},
});

LocationSchema.virtual("url").get(function () {
    return `/location/${this._id}`;
  });

module.exports = mongoose.model('Location', LocationSchema);
