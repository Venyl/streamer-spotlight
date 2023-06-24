export default async function voteStreamer(streamerName: string) {
    if (!streamerName) {
        throw Error('Streamer name not provided');
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: streamerName,
    };
    const data = await fetch(
        `http://localhost:5000/streamers/${streamerName}/vote`,
        options
    );

    if (data.status === 500) {
        throw Error('Invalid vote');
    }

    return {
        status: data.status,
        success: data.status === 200,
    };
}
