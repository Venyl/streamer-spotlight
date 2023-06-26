import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Icon } from '@iconify/react';

import getStreamer from '../api/getStreamer';
import voteStreamer from '../api/voteStreamer';

export default function StreamerPage() {
    const { streamerName } = useParams();
    const {
        data: streamer,
        isLoading,
        isError,
        error,
    } = useQuery(['streamers', 'single'], () => getStreamer(streamerName));

    const icon = `tabler:brand-${streamer?.platform.toLowerCase()}`;

    async function handleVote(
        vote: 'upvote' | 'downvote',
        streamerName: string
    ) {
        await voteStreamer(vote, streamerName);
    }

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error! {error instanceof Error && error.message}</p>}
            {streamer && (
                <section className="streamer glass-bg">
                    <div className="streamer-img-wrapper">
                        <img
                            src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png"
                            alt="the profile picture of this streamer"
                        />
                    </div>

                    <div className="streamer-text">
                        <span className="streamer-info">
                            <h2 className="streamer-name">{streamer.name}</h2>
                            <p className="streamer-platform">
                                <Icon icon={icon} />
                            </p>
                        </span>
                        <p className="streamer-desc">{streamer.description}</p>
                        <p className="streamer-votes">
                            <span>
                                <button
                                    className="upvote-btn"
                                    onClick={() =>
                                        handleVote('upvote', streamer.name)
                                    }
                                >
                                    <Icon icon="tabler:arrow-up" />
                                </button>{' '}
                                {streamer.upvotes}
                            </span>
                            <span>
                                <button
                                    className="downvote-btn"
                                    onClick={() =>
                                        handleVote('downvote', streamer.name)
                                    }
                                >
                                    <Icon icon="tabler:arrow-down" />
                                </button>{' '}
                                {streamer.downvotes}
                            </span>
                        </p>
                    </div>
                </section>
            )}
        </>
    );
}
