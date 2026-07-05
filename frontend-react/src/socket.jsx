import { io } from 'socket.io-client';

const socket = io('https://project-intern-backend.onrender.com', {
  auth: { token: localStorage.getItem('token') },
  autoConnect: false
});

export default socket;