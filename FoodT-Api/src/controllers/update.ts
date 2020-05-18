import express from 'express';
import { UpdateService } from '../services/update.service';

const router = express.Router();
const service = new UpdateService();

router.post('/person', async (req, res) => {
    try {
        const corpo = req.body;
        const result = await service.updatePerson(corpo)
        res.status(200).send(result);
    } catch (error) {
        res.send(error)
    }
});

router.post('/truck', async (req, res) => {
    try {
        const corpo = req.body;
        const result = await service.updateTruck(corpo)
        res.status(200).send(result)
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;
