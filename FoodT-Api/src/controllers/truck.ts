import express from 'express';
import { TruckService } from '../services/truck.service'

const router = express.Router();
const service = new TruckService();

router.get('/', async (req, res) => {
    try {
        res.status(200).send(await service.get());
    } catch (error) {
        res.send(error)
    }
});

router.post('/count', async (req, res) => {
    try {
        const corpo = req.body;
        const result = await service.count(corpo);
        res.status(200).send(result.toString());
    } catch (error) {
        res.send(error)
    }
});
module.exports = router;
