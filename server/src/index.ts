import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import socketio from 'socket.io';
import Streamer, { IStreamer } from './models/Streamer';

const app = express();
if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
}

app.use(cors());

app.get('/streamers', async (req: Request, res: Response) => {
    res.json(await Streamer.find());
});

app.post(
    '/streamers',
    async (req: Request<{}, {}, IStreamer>, res: Response) => {
        const { name, platform, description } = req.body;
        const newStreamer = new Streamer<IStreamer>({
            name,
            platform,
            description,
            upvotes: 0,
            downvotes: 0,
        });
        await newStreamer.save();
    }
);

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
