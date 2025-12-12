
const express = require('express');
const {
  getBalance,
  transfer,
  getTransactions
} = require('../controllers/account.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();


const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);


router.get('/balance', auth, asyncHandler(getBalance));


router.post('/transfer', auth, asyncHandler(transfer));


router.get('/transactions', auth, asyncHandler(getTransactions));

module.exports = router;
