import StreamerList from './StreamerList';
import StreamerForm from './StreamerForm';

function Home() {
    return (
        <div className="home-container">
            <StreamerForm />
            <StreamerList />
        </div>
    );
}

export default Home;
