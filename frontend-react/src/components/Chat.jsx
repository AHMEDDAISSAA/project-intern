import { useState, useEffect } from 'react';
import socket from '../socket';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on('connect_error', (err) => {
      console.error("Erreur de connexion socket:", err.message);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('connect_error');
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit('sendMessage', message);
    setMessage('');
  };

  return (
    <div>
      <h2>Chat en temps réel</h2>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg.from ? `${msg.from}: ${msg.text}` : msg}</li>
        ))}
      </ul>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
}

export default Chat;