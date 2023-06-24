import { IStreamer } from '../lib/types';

export default async function addStreamer(streamer: IStreamer) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(streamer),
    };
    const res = await fetch('http://localhost:5000/streamers', options);
    const data = await res.json();
    return data;
}
