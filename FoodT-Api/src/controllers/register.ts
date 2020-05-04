import express from 'express';
import { RegisterService } from '../services/register.service'

const router = express.Router();
const service = new RegisterService();

router.post('/person', async (req, res) => {
    try {
        var corpo = req.body;
        console.log("Dado recebido: ", corpo)
        await service.insertPerson(corpo)
        console.log("Registrado com sucesso");
        res.status(200).send("Register, OK!")
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
