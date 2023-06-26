import { Link } from 'react-router-dom';

import { IStreamerWithVotes } from '../lib/types';

import voteStreamer from '../api/voteStreamer';

type Props = { streamer: IStreamerWithVotes };

export default function StreamerCard({ streamer }: Props) {
    async function handleVote(
        vote: 'upvote' | 'downvote',
        streamerName: string
    ) {
        await voteStreamer(vote, streamerName);
    }

    return (
        <li className="streamer-card glass-bg">
            <div className="streamer-info">
                <Link to={`/streamer/${streamer.name}`}>
                    <h3>{streamer.name}</h3>
                </Link>
                <p className="streamer-platform">{streamer.platform}</p>
            </div>
            <p className="streamer-desc">{streamer.description}</p>
            <div className="streamer-votes">
                <span>
                    <button
                        className="upvote-btn"
                        onClick={() => handleVote('upvote', streamer.name)}
                    >
                        +
                    </button>{' '}
                    {streamer.upvotes}
                </span>
                <span>
                    <button
                        className="downvote-btn"
                        onClick={() => handleVote('downvote', streamer.name)}
                    >
                        -
                    </button>{' '}
                    {streamer.downvotes}
                </span>
            </div>
        </li>
    );
}
