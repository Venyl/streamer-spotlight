export interface IStreamer {
    name: string;
    platform: 'Twitch' | 'YouTube' | 'TikTok' | 'Kick' | 'Rumble';
    description: string;
}

export interface IStreamerWithVotes extends IStreamer {
    upvotes: number;
    downvotes: number;
}
