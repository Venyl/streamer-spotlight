import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export interface IStreamerWithVotes {
    name: string;
    platform: 'Twitch' | 'YouTube' | 'TikTok' | 'Kick' | 'Rumble';
    description: string;
    upvotes: number;
    downvotes: number;
}

const StreamerSchema = new Schema<IStreamerWithVotes>({
    name: ObjectId,
    platform: {
        type: String,
        enum: ['Twitch', 'YouTube', 'TikTok', 'Kick', 'Rumble'],
        required: true,
    },
    description: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
});

const Streamer = mongoose.model<IStreamerWithVotes>('Streamer', StreamerSchema);

export default Streamer;
