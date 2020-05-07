import express from 'express';
import { LoginService } from '../services/login.service'

const router = express.Router();
const service = new LoginService();

router.post('/person', async (req, res) => {
    try {
        var corpo = req.body;
        const result = await service.loginPerson(corpo)
        console.log("Dado que foi pego:", result);
        res.status(200).send(result);
    } catch (error) {
        res.send(error)
    }
});

router.post('/truck', async (req, res) => {
    try {
        var corpo = req.body;
        const result = await service.loginTruck(corpo)
        console.log("Dado que foi pego:", result);
        res.status(200).send(result)
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;
