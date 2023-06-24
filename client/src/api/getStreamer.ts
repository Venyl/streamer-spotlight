import { IStreamerWithVotes } from '../lib/types';

export default async function getStreamer(streamerName: string | undefined) {
    if (!streamerName) {
        throw Error('Streamer name not provided');
    }
    const data = await fetch(`http://localhost:5000/streamer/${streamerName}`);

    if (data.status === 400) {
        throw Error('Streamer not found');
    }
    const streamer: IStreamerWithVotes = await data.json();

    return streamer;
}
