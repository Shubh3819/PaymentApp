const express = require('express');
const router = express.Router();
const { bulk } = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');


router.get('/bulk', auth, bulk);

module.exports = router;
