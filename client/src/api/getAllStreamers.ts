import { IStreamer } from '../lib/types';

export default async function getAllStreamers() {
    const data = await fetch('https://localhost:5000/streamers');
    const streamers: IStreamer[] = await data.json();
    return streamers;
}
