
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending','completed','failed'], default: 'completed' },
  note: { type: String, default: '' }
}, { timestamps: true });


transactionSchema.index({ fromUserId: 1, toUserId: 1, createdAt: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
