import { useQuery } from '@tanstack/react-query';
import getAllStreamers from './api/getAllStreamers';
import StreamerList from './components/StreamerList';
import addStreamer from './api/addStreamer';
import { IStreamer } from './lib/types';
import { useState } from 'react';
import IssueList from './components/IssueList';

function App() {
    const {
        data: streamers,
        isLoading,
        isError,
    } = useQuery(['text'], getAllStreamers);

    const [issues, setIssues] = useState<string[]>([]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const streamerData = Object.fromEntries(
            formData
        ) as unknown as IStreamer;
        const resData = await addStreamer(streamerData);
        setIssues(resData.issues);
    }

    return (
        <main>
            <aside>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error!</p>}
                {streamers && <StreamerList streamers={streamers} />}
            </aside>

            <IssueList issues={issues} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" required />

                <label htmlFor="platform">Platform</label>
                <select name="platform" id="platform" required>
                    <option>Twitch</option>
                    <option>YouTube</option>
                    <option>TikTok</option>
                    <option>Kick</option>
                    <option>Rumble</option>
                </select>

                <label htmlFor="description">Name</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    required
                />

                <button>Add</button>
            </form>
        </main>
    );
}

export default App;
