import React, { useContext, useState } from 'react';
import { SocketContext } from '../SocketContext'

const Chat = () => {
    const { messages, inputText, setInputText, sendMessage } = useContext(SocketContext);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className="fixed bottom-4 right-4 z-10">
        <button
            className="bg-green-500 rounded-full p-2 text-white shadow-lg focus:outline-none"
            onClick={toggleChat}
        >
            Chat
        </button>
        {isChatOpen && (
            <div className="bg-white shadow-lg rounded-lg w-72 max-h-96 overflow-y-scroll">
            <div className="px-4 py-2 border-b border-gray-300 flex justify-between items-center">
                <h2 className="font-medium text-lg">Chat</h2>
                <button onClick={toggleChat} className="text-gray-400 hover:text-gray-500">
                X
                </button>
            </div>
            <div className="p-4">
                {messages.map((message, index) => (
                <div key={index} className="mb-2">
                    <p className={`p-2 rounded-lg ${message.sender === 'me' ? 'bg-blue-200' : 'bg-gray-200'}`}>
                    {message.body}
                    </p>
                </div>
                ))}
            </div>
            <div className="flex items-center justify-between border-t border-gray-300 px-4 py-2">
                <input
                className="bg-gray-200 px-4 py-2 w-full rounded-lg mr-2"
                type="text"
                placeholder="Type your message"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                className="bg-green-500 rounded-full p-2 text-white shadow-lg focus:outline-none"
                onClick={sendMessage}
                >
                Send
                </button>
            </div>
            </div>
        )}
        </div>
    );
};

export default Chat;
