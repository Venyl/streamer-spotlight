import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import getStreamer from '../api/getStreamer';

export default function StreamerPage() {
    const { streamerName } = useParams();
    const {
        data: streamer,
        isLoading,
        isError,
        error,
    } = useQuery(['streamer'], () => getStreamer(streamerName));

    console.log(error);

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error! {error instanceof Error && error.message}</p>}
            {streamer && (
                <div>
                    <div>
                        <img
                            src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png"
                            alt="the profile picture of this streamer"
                        />
                    </div>

                    <h2>{streamer.name}</h2>
                    <p>{streamer.description}</p>
                    <p>
                        <span>Up: {streamer.upvotes}</span>
                        <span>Down: {streamer.downvotes}</span>
                    </p>
                </div>
            )}
        </>
    );
}
