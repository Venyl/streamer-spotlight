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

            <h1 className="form-title">Add a streamer</h1>

            <div className="input-container">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Asmongold"
                    required
                    value={streamer.name}
                    onChange={e =>
                        setStreamer(streamer => ({
                            ...streamer,
                            name: e.target.value,
                        }))
                    }
                />
            </div>

            <div className="input-container">
                <label htmlFor="platform">Platform</label>
                <select
                    name="platform"
                    id="platform"
                    required
                    value={streamer.platform}
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
                    <option selected>Twitch</option>
                    <option>YouTube</option>
                    <option>TikTok</option>
                    <option>Kick</option>
                    <option>Rumble</option>
                </select>
            </div>

            <div className="input-container">
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    placeholder="Asmongold is an American Twitch streamer..."
                    rows={5}
                    required
                    value={streamer.description}
                    onChange={e =>
                        setStreamer(streamer => ({
                            ...streamer,
                            description: e.target.value,
                        }))
                    }
                />
            </div>

            <button type="submit">+ Add</button>
        </form>
    );
}
