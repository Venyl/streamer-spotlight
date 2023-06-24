import { useQuery } from '@tanstack/react-query';
import getAllStreamers from '../api/getAllStreamers';
import { Link } from 'react-router-dom';
import voteStreamer from '../api/voteStreamer';

export default function StreamerList() {
    const {
        data: streamers,
        isLoading,
        isError,
    } = useQuery(['streamers'], getAllStreamers);

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
                                            voteStreamer(
                                                'upvote',
                                                streamer.name
                                            )
                                        }
                                    >
                                        +
                                    </button>{' '}
                                    {streamer.upvotes}
                                </span>
                                <span>
                                    <button
                                        onClick={() =>
                                            voteStreamer(
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
