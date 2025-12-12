
const { z } = require('zod');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/user.model');
const Account = require('../models/account.model');
const { JWT_SECRET } = require('../config');

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in config');
}

const STARTING_BALANCE = 1000;

const signupSchema = z.object({
  username: z.string().email().min(3),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(6)
});

const signinSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

async function signup(req, res, next) {
  let session = null;
  try {
    const parsed = signupSchema.parse(req.body);
    const username = String(parsed.username).trim().toLowerCase();

    const existing = await User.findOne({ username }).lean();
    if (existing) return res.status(409).json({ message: 'Username already in use' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(parsed.password, salt);

    session = await mongoose.startSession();
    session.startTransaction();
    try {
      const createdUsers = await User.create([{
        username,
        password: hashed,
        firstName: parsed.firstName,
        lastName: parsed.lastName
      }], { session });

      const user = createdUsers[0];

      await Account.create([{
        userId: user._id,
        balance: STARTING_BALANCE
      }], { session });

      await session.commitTransaction();
      session.endSession();

      const token = jwt.sign({ userId: String(user._id) }, JWT_SECRET, { expiresIn: '30d' });
      return res.status(201).json({ token, userId: String(user._id) });
    } catch (err) {
      try { await session.abortTransaction(); } catch (e) {}
      session.endSession();
      throw err;
    }
  } catch (err) {
    if (err && err.name === 'ZodError') {
      const messages = err.errors?.map(e => e.message).filter(Boolean);
      return res.status(400).json({ message: 'Invalid input', errors: messages });
    }
    next(err);
  }
}

async function signin(req, res, next) {
  try {
    const parsed = signinSchema.parse(req.body);
    const username = String(parsed.username).trim().toLowerCase();

    const user = await User.findOne({ username }).lean();
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(parsed.password, user.password || '');
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: String(user._id) }, JWT_SECRET, { expiresIn: '30d' });
    return res.json({ token, userId: String(user._id) });
  } catch (err) {
    if (err && err.name === 'ZodError') {
      const messages = err.errors?.map(e => e.message).filter(Boolean);
      return res.status(400).json({ message: 'Invalid input', errors: messages });
    }
    next(err);
  }
}

module.exports = { signup, signin };
