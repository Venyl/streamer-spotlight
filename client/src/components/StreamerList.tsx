import { IStreamerWithVotes } from '../lib/types';

type Props = {
    streamers: IStreamerWithVotes[];
};

export default function StreamerList({ streamers }: Props) {
    return (
        <ul>
            {streamers.map(streamer => (
                <li key={streamer.name}>
                    <h2>{streamer.name}</h2>
                    <p>{streamer.platform}</p>
                    <p>{streamer.description}</p>
                    <div>
                        <span>Up: {streamer.upvotes}</span>
                        <span>Down: {streamer.downvotes}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
}
