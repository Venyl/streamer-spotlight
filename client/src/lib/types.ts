export interface IStreamer {
    name: string;
    platform: 'Twitch' | 'YouTube' | 'TikTok' | 'Kick' | 'Rumble';
    description: string;
    upvotes: number;
    downvotes: number;
}
