import express from 'express';
import { PersonService } from '../services/person.service'

const router = express.Router();
const service = new PersonService();

router.post('/', async (req, res) => {
    try {
        var corpo = req.body;
        console.log("Dado recebido: ", corpo)
        await service.insert(corpo)
        console.log("Registrado com sucesso");
        res.status(200).send("Register, OK!")
    } catch (error) {
        res.send(error)
    }
});


router.put('/update', async (req, res) => {
    try {
        var corpo = req.body;
        console.log("Dado recebido: ", corpo)
        await service.update(corpo)
        console.log("Registrado com sucesso");
        res.status(200).send("Register, OK!")
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;
