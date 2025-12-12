
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balance: { type: Number, required: true, default: 1000 }
}, { timestamps: true });

accountSchema.index({ userId: 1 });

module.exports = mongoose.model('Account', accountSchema);
