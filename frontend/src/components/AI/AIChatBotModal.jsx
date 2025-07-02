// src/components/AI/AIChatBotModal.jsx

import React, { useState } from 'react';
import mockData from './mockAIData';
import './AIChatBotModal.css';

// Material Icons
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const AIChatBotModal = ({ onClose }) => {
    const [history, setHistory] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (!input.trim()) return;
        const key = input.toLowerCase().trim();
        const response = mockData.chatResponses[key] || "🧠 I'm analyzing this... Try rephrasing your question.";
        setHistory([...history, { q: input, a: response }]);
        setInput('');
    };

    return (
        <div className="chatbot-modal">
            {/* Header */}
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0061b0' }}>
                <ChatBubbleOutlineIcon /> AI Chat Assistant
            </h3>

            {/* Chat history bubble section */}
            <div className="chat-history">
                {history.map((item, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <p><strong>You:</strong> {item.q}</p>
                        <p><strong>AI:</strong> {item.a}</p>
                    </div>
                ))}
            </div>

            {/* Input & buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Ask a question like: 'why was cargo flagged?'"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="ai-button" onClick={sendMessage}>
                    <SendIcon style={{ fontSize: '16px' }} /> Send
                </button>
                <button className="ai-button" style={{ background: '#b00020' }} onClick={onClose}>
                    <CloseIcon style={{ fontSize: '16px' }} /> Close
                </button>
            </div>
        </div>
    );
};

export default AIChatBotModal;
