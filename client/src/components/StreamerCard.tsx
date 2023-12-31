import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

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

    const trimmedDesc =
        streamer.description.length > 100
            ? streamer.description.substring(
                  0,
                  streamer.description.indexOf(' ', 100)
              ) + '...'
            : streamer.description;

    const icon = `tabler:brand-${streamer.platform.toLowerCase()}`;

    return (
        <li className="streamer-card glass-bg">
            <div className="streamer-info">
                <Link to={`/streamer/${streamer.name}`}>
                    <h3 className="streamer-name">{streamer.name}</h3>
                </Link>
                <p className="streamer-platform">
                    <Icon icon={icon} />
                </p>
            </div>

            <p className="streamer-desc">{trimmedDesc}</p>

            <div className="streamer-votes">
                <span>
                    <button
                        className="upvote-btn"
                        onClick={() => handleVote('upvote', streamer.name)}
                    >
                        <Icon icon="tabler:arrow-up" />
                    </button>{' '}
                    {streamer.upvotes}
                </span>

                <span>
                    <button
                        className="downvote-btn"
                        onClick={() => handleVote('downvote', streamer.name)}
                    >
                        <Icon icon="tabler:arrow-down" />
                    </button>{' '}
                    {streamer.downvotes}
                </span>
            </div>
        </li>
    );
}
