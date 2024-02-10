const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

LocationSchema.virtual('url').get(function () {
  return `/store/location/${this._id}`;
});

module.exports = mongoose.model('Location', LocationSchema);
