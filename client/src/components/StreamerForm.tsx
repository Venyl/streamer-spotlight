import { useState } from 'react';

import { IStreamer } from '../lib/types';

import addStreamer from '../api/addStreamer';

import IssueList from './IssueList';

export default function StreamerForm() {
    const [streamer, setStreamer] = useState<IStreamer>({
        name: '',
        platform: 'Twitch',
        description: '',
    });

    const [issues, setIssues] = useState<string[]>([]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const resData = await addStreamer(streamer);
        setIssues(resData.issues);
        setStreamer({ name: '', platform: 'Twitch', description: '' });
    }

    return (
        <form onSubmit={handleSubmit}>
            <IssueList issues={issues} />

            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                required
                onChange={e =>
                    setStreamer(streamer => ({
                        ...streamer,
                        name: e.target.value,
                    }))
                }
            />

            <label htmlFor="platform">Platform</label>
            <select
                name="platform"
                id="platform"
                required
                onChange={e =>
                    setStreamer(streamer => ({
                        ...streamer,
                        platform: e.target.value as
                            | 'Twitch'
                            | 'YouTube'
                            | 'TikTok'
                            | 'Kick'
                            | 'Rumble',
                    }))
                }
            >
                <option>Twitch</option>
                <option>YouTube</option>
                <option>TikTok</option>
                <option>Kick</option>
                <option>Rumble</option>
            </select>

            <label htmlFor="description">Description</label>
            <input
                type="text"
                name="description"
                id="description"
                required
                onChange={e =>
                    setStreamer(streamer => ({
                        ...streamer,
                        description: e.target.value,
                    }))
                }
            />

            <button>Add</button>
        </form>
    );
}
