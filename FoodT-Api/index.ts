import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const server = express();


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(cors());
server.use(require('./src/controllers/index'));

server.get('/', (_, res) => {
    res.json({
        message: `API is running on PORT 3000`,
        version: '1.0'
    });
});

server.listen(8080, () => {
    console.log({ message: `People Registration API is running at http://localhost:3000`, version: "1.0" });
});
