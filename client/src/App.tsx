import { useQuery } from '@tanstack/react-query';

function App() {
    const { data, isLoading, isError, error } = useQuery(['text'], () =>
        fetch('http://localhost:50100/').then(res => res.text())
    );

    return (
        <main>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error! {error as string}</p>}
            {data && <p>{data}</p>}
        </main>
    );
}

export default App;
