import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Migration API',
        version: '1.0.0'
    });
});

module.exports = router;
