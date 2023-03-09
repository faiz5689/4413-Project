import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import customerRouter from './routes/customer.router.js';

dotenv.config();


const PORT = process.env.PORT || 4000;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/users', customerRouter);
server.get('/', (req, res) => {
  res.send('Server is ready');
});


server.listen(PORT, () => console.log(`listening on port ${PORT}`));