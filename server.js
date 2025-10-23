import express from "express";
import env from "dotenv";
import { v4 as uuidv4 } from 'uuid';
import { methodName} from './middleware/logger.js'
import { readFileSync, writeFileSync } from 'fs';


const id = uuidv4();
env.config();
const server = express();

server.use(methodName);
server.use(express.json());
server.use(express.static('public'));

server.get('/items', (req, res) => {
    const data = JSON.parse(readFileSync("./data/db.json", 'utf8'));
    res.json(data);
  });

   server.post('/items', (req, res) => {
    const data = JSON.parse(readFileSync("./data/db.json", 'utf8'));
    const newItem = { id: uuidv4(), name: req.body.name , surname: req.body.surname };
    data.push(newItem);
    writeFileSync("./data/db.json", JSON.stringify(data, null, 2));
    res.status(201).json(newItem);
  });

server.listen(process.env.PORT, () => {
    console.log(`server is listen on port ${process.env.PORT}`);
});