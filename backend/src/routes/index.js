const express = require('express');
const router = express.Router();

router.use('/user', require('./auth.routes'));  
router.use('/user', require('./user.routes'));    
router.use('/account', require('./account.routes'));

module.exports = router;
