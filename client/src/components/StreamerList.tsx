import { IStreamer } from '../lib/types';

type Props = {
    streamers: IStreamer[];
};

export default function StreamerList({ streamers }: Props) {
    return (
        <ul>
            {streamers.map(streamer => (
                <li key={streamer.name}>{streamer.name}</li>
            ))}
        </ul>
    );
}
