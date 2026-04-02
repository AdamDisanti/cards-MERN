const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  UserId: {
    type: Number
  },
  Card: {
    type: String,
    required: true
  }
}, { collection: 'Cards' });

module.exports = mongoose.model('Cards', CardSchema);
