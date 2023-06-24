import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import socketio from 'socket.io';

const app = express();

app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(5000);
