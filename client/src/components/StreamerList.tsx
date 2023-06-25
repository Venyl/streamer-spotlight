import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import getAllStreamers from '../api/getAllStreamers';
import voteStreamer from '../api/voteStreamer';

export default function StreamerList() {
    const {
        data: streamers,
        isLoading,
        isError,
    } = useQuery(['streamers'], getAllStreamers);

    async function handleVote(
        vote: 'upvote' | 'downvote',
        streamerName: string
    ) {
        await voteStreamer(vote, streamerName);
    }

    return (
        <aside>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error!</p>}
            {streamers && (
                <ul>
                    {streamers.map(streamer => (
                        <li key={streamer.name}>
                            <Link to={`/streamer/${streamer.name}`}>
                                <h2>{streamer.name}</h2>
                            </Link>
                            <p>{streamer.platform}</p>
                            <p>{streamer.description}</p>
                            <div>
                                <span>
                                    <button
                                        onClick={() =>
                                            handleVote('upvote', streamer.name)
                                        }
                                    >
                                        +
                                    </button>{' '}
                                    {streamer.upvotes}
                                </span>
                                <span>
                                    <button
                                        onClick={() =>
                                            handleVote(
                                                'downvote',
                                                streamer.name
                                            )
                                        }
                                    >
                                        -
                                    </button>{' '}
                                    {streamer.downvotes}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </aside>
    );
}
