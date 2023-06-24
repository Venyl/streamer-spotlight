import { useQuery } from '@tanstack/react-query';
import getAllStreamers from '../api/getAllStreamers';

export default function StreamerList() {
    const {
        data: streamers,
        isLoading,
        isError,
    } = useQuery(['text'], getAllStreamers);

    return (
        <aside>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error!</p>}
            {streamers && (
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
            )}
        </aside>
    );
}
