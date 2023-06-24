import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import socketio from 'socket.io';

const app = express();
if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
}
const db = mongoose.connect(process.env.MONGO_URI);

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(5000);
