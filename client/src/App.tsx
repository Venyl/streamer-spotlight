import { useQuery } from '@tanstack/react-query';
import getAllStreamers from './api/getAllStreamers';
import StreamerList from './components/StreamerList';

function App() {
    const {
        data: streamers,
        isLoading,
        isError,
        error,
    } = useQuery(['text'], getAllStreamers);

    return (
        <main>
            <aside>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error! {error as string}</p>}
                {streamers && (
                    <p>
                        <StreamerList streamers={streamers} />
                    </p>
                )}
            </aside>

            <form>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />

                <label htmlFor="platform">Platform</label>
                <select name="platform" id="platform">
                    <option>Twitch</option>
                    <option>YouTube</option>
                    <option>TikTok</option>
                    <option>Kick</option>
                    <option>Rumble</option>
                </select>

                <label htmlFor="description">Name</label>
                <input type="text" name="description" id="description" />

                <button>Add</button>
            </form>
        </main>
    );
}

export default App;
