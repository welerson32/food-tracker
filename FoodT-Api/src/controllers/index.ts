import express from 'express';

const router = express();

router.use('/register', require('./register'));
router.use('/login', require('./login'));

module.exports = router;
 //pau no cu de quem ta lendi
 