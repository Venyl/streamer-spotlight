import StreamerList from './components/StreamerList';
import { useState } from 'react';
import IssueList from './components/IssueList';
import StreamerForm from './components/StreamerForm';

function App() {
    const [issues, setIssues] = useState<string[]>([]);

    return (
        <main>
            <StreamerList />
            <IssueList issues={issues} />
            <StreamerForm setIssues={setIssues} />
        </main>
    );
}

export default App;
