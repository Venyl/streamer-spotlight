import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import socketio from 'socket.io';

const app = express();
// const db = mongoose.connect();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(5000);
