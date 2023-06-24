import 'dotenv/config';

if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
}

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Streamer, { IStreamerWithVotes } from './models/Streamer';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        methods: ['GET', 'POST', 'PUT'],
        origin: 'http://localhost:5173',
    },
});

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

        if (await Streamer.exists({ name })) {
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
            io.emit('invalidate');
            res.json(resData);
        }
    }
);

app.get('/streamer/:streamerName', async (req: Request, res: Response) => {
    const name = req.params.streamerName;
    const streamer = await Streamer.findOne({ name });
    if (!streamer) {
        res.sendStatus(400);
        return;
    }
    res.json(streamer);
});

app.put(
    '/streamers/:streamerName/vote',
    async (req: Request, res: Response) => {
        const { vote } = req.body;
        const name = req.params.streamerName;

        if (!vote || !name || !['upvote', 'downvote'].includes(vote)) {
            res.sendStatus(400);
            return;
        }

        const streamer = await Streamer.findOne({ name });
        if (streamer) {
            streamer[(vote + 's') as keyof IStreamerWithVotes]++;
            try {
                await streamer.save();
            } catch (err) {
                console.error(err);
                res.sendStatus(500);
                return;
            }
            io.emit('invalidate');
            res.sendStatus(200);
        }
    }
);

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
