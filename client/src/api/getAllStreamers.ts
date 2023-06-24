import { IStreamerWithVotes } from '../lib/types';

export default async function getAllStreamers() {
    const data = await fetch('http://localhost:5000/streamers');
    const streamers: IStreamerWithVotes[] = await data.json();
    return streamers;
}
