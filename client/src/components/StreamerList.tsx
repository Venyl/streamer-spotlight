import { useQuery } from '@tanstack/react-query';

import getAllStreamers from '../api/getAllStreamers';

import StreamerCard from './StreamerCard';

export default function StreamerList() {
    const {
        data: streamers,
        isLoading,
        isError,
    } = useQuery(['streamers'], getAllStreamers);

    return (
        <section>
            <h2 className="section-title">Streamers</h2>

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error!</p>}
            {streamers && (
                <ul className="streamer-list">
                    {streamers.map(streamer => (
                        <StreamerCard key={streamer.name} streamer={streamer} />
                    ))}
                </ul>
            )}
        </section>
    );
}
