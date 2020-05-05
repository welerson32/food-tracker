import express from 'express';
import { LoginService } from '../services/login.service'

const router = express.Router();
const service = new LoginService();

router.post('/person', async (req, res) => {
    try {
        var corpo = req.body;
        console.log("Dado recebido: ", corpo)
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
        console.log("Dado recebido: ", corpo)
        await service.insertTruck(corpo)
        console.log("Registrado com sucesso");
        res.status(200).send("Register, OK!")
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;
