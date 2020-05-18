import express from 'express';

const router = express();

router.use('/register', require('./register'));
router.use('/login', require('./login'));
router.use('/update', require('./update'));

module.exports = router;
