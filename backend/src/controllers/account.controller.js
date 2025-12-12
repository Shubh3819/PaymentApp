
const { z } = require('zod');
const mongoose = require('mongoose');
const Account = require('../models/account.model');
const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');

const transferSchema = z.object({
  to: z.string().min(1),
  amount: z.number().positive()
});

const STARTING_BALANCE = 1000; 
/////////////////////////////////////////////
async function getBalance(req, res, next) {
  try {
    if (!req.userId) return res.status(401).json({ message: 'Authorization required' });

    let acc = await Account.findOne({ userId: req.userId });
    if (!acc) {
      acc = await Account.create({
        userId: req.userId,
        balance: STARTING_BALANCE
      });
    }

    return res.json({ balance: Number(acc.balance || 0) });
  } catch (err) {
    next(err);
  }
}
/////////////////////////////////transfer////////////////
async function transfer(req, res, next) {
  try {
    const parsed = transferSchema.parse(req.body);
    const amount = parsed.amount;
    const toId = parsed.to;

    if (!req.userId) return res.status(401).json({ message: 'Authorization required' });
    if (toId === String(req.userId)) return res.status(400).json({ message: 'Cannot transfer to self' });

    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const senderAcc = await Account.findOne({ userId: req.userId }).session(session);
      if (!senderAcc) {
        await session.abortTransaction();
        return res.status(404).json({ message: 'Sender account not found' });
      }

      const currentBalance = Number(senderAcc.balance || 0);
      if (currentBalance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
          message: `Insufficient funds you have ${currentBalance}, tried to transfer ${amount}`,
          details: { balance: currentBalance, requested: amount }
        });
      }

      const receiverUser = await User.findById(toId).session(session);
      if (!receiverUser) {
        await session.abortTransaction();
        return res.status(404).json({ message: 'Recipient not found' });
      }

      let receiverAcc = await Account.findOne({ userId: receiverUser._id }).session(session);
      if (!receiverAcc) {
        // create receiver account if missing with STARTING_BALANCE
        receiverAcc = await Account.create([{
          userId: receiverUser._id,
          balance: STARTING_BALANCE
        }], { session }).then(docs => docs[0]);
      }

      await Account.updateOne({ _id: senderAcc._id }, { $inc: { balance: -amount } }).session(session);
      await Account.updateOne({ _id: receiverAcc._id }, { $inc: { balance: amount } }).session(session);
///////////////////////////////////Transaction///////////////
      await Transaction.create([{
        fromUserId: req.userId,
        toUserId: receiverUser._id,
        amount,
        status: 'completed'
      }], { session });

      await session.commitTransaction();
      session.endSession();

      return res.json({ ok: true, transferred: amount });
    } catch (err) {
      try { await session.abortTransaction(); } catch (e) {}
      session.endSession();
      console.error('Transfer failed (transaction):', err);
      return res.status(500).json({ message: 'Transfer failed' });
    }
  } catch (err) {
    if (err && err.name === 'ZodError') {
      return res.status(400).json({ message: 'Invalid input', errors: err.errors });
    }
    next(err);
  }
}

async function getTransactions(req, res, next) {
  try {
    if (!req.userId) return res.status(401).json({ message: 'Authorization required' });

    const page = Math.max(1, Number(req.query.page || 1));
    const limit = Math.min(100, Number(req.query.limit || 20));
    const skip = (page - 1) * limit;

    const filter = {
      $or: [
        { fromUserId: req.userId },
        { toUserId: req.userId }
      ]
    };

    const [total, docs] = await Promise.all([
      Transaction.countDocuments(filter),
      Transaction.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('fromUserId', 'firstName lastName username')
        .populate('toUserId', 'firstName lastName username')
        .lean()
    ]);

    return res.json({
      transactions: docs,
      page,
      limit,
      total
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getBalance, transfer, getTransactions };
