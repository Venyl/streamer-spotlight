import io from 'socket.io-client';
const URL = import.meta.env.API_URL ?? 'http://localhost:5000';
export const socket = io(URL);
