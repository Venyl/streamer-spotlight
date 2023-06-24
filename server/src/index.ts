import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import socketio from 'socket.io';
import Streamer, { IStreamerWithVotes } from './models/Streamer';

const app = express();
if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
}

app.use(cors());
app.use(express.json());

app.get('/streamers', async (req: Request, res: Response) => {
    res.json(await Streamer.find());
});

app.post(
    '/streamers',
    async (req: Request<{}, {}, IStreamerWithVotes>, res: Response) => {
        const { name, platform, description } = req.body;
        const resData = {
            success: true,
            issues: [] as string[],
        };

        const requiredFields = ['name', 'platform', 'description'];
        requiredFields.forEach(field => {
            if (!req.body[field as keyof IStreamerWithVotes]) {
                resData.success = false;
                resData.issues.push(`${field} is required`);
            }
        });

        if (await Streamer.findOne({ name })) {
            resData.success = false;
            resData.issues.push('Streamer already exists');
        }

        let newStreamer;
        if (resData.success) {
            newStreamer = new Streamer<IStreamerWithVotes>({
                name,
                platform,
                description,
                upvotes: 0,
                downvotes: 0,
            });
        }

        try {
            await newStreamer?.save();
        } catch (err) {
            console.error(err);
        } finally {
            res.json(resData);
        }
    }
);

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
