import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const socket = io('http://localhost:3000');

    useEffect(() => {
        socket.on('chat message', msg => {
            setMessages(prev => [...prev, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim()) {
            socket.emit('chat message', input);
            setInput('');
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Chat with AI</h1>
            </header>
            <main>
                <ul id="messages">
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
                <form id="form" onSubmit={sendMessage}>
                    <input id="input" autoComplete="off" value={input} onChange={(e) => setInput(e.target.value)} />
                    <button type="submit">Send</button>
                </form>
            </main>
        </div>
    );
}

export default App;

