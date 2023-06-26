import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { socket } from './lib/socket';

export default function Layout() {
    const queryClient = useQueryClient();

    useEffect(() => {
        socket.on('invalidate', async () => {
            await queryClient.invalidateQueries(['streamers']);
        });

        return () => {
            socket.off('invalidate');
        };
    }, [queryClient]);
    return (
        <>
            <header>
                <nav>
                    <ul className="nav-list">
                        <li>
                            <Link to="/">StreamerSpotlight</Link>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
