import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { socket } from './socket';

export default function Layout() {
    const queryClient = useQueryClient();

    useEffect(() => {
        socket.on('invalidate', async () => {
            console.log('invalidating');
            await queryClient.invalidateQueries(['streamers']);
            console.log('invalidated');
        });
        console.log(
            'listening for invalidation:',
            socket.hasListeners('invalidate')
        );
        return () => {
            socket.off('invalidate');
        };
    }, [queryClient]);
    return (
        <>
            <header>
                <nav>
                    <ul>
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
