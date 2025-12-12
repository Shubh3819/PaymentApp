
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

//Validation
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

const bulkSchema = z.object({
  filter: z.string().optional()
});

/////////////////////////SIgnup///////////////////////
async function signup(req, res, next) {
  let session = null;
  try {
    const parsed = signupSchema.parse(req.body);

    const username = String(parsed.username).trim().toLowerCase();

    // check duplicate username
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
        balance: 1000 
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


async function bulk(req, res, next) {
  try {
    const parsed = bulkSchema.parse(req.query);
    const q = (parsed.filter || '').trim();


    const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = q
      ? {
          $or: [
            { firstName: { $regex: escapeRegex(q), $options: 'i' } },
            { lastName: { $regex: escapeRegex(q), $options: 'i' } },
            { username: { $regex: escapeRegex(q), $options: 'i' } }
          ]
        }
      : {};


    if (req.userId) {
      match._id = { $ne: req.userId };
    }

    const users = await User.find(match)
      .limit(50)
      .select('firstName lastName username')
      .lean();

    return res.json({ user: users });
  } catch (err) {
    if (err && err.name === 'ZodError') {
      const messages = err.errors?.map(e => e.message).filter(Boolean);
      return res.status(400).json({ message: 'Invalid input', errors: messages });
    }
    next(err);
  }
}

module.exports = {
  signup,
  signin,
  bulk
};
