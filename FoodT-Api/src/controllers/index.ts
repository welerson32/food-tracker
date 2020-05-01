import express from 'express';

const router = express();

router.use('/register', require('./register'))

module.exports = router;
