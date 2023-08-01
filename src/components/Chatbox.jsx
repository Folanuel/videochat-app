import React from 'react';
import { SocketContext } from '../SocketContext'
import { useContext } from 'react';

const Chat = () => {

    const { messages, inputText, setInputText, sendMessage } = useContext(SocketContext);
    return (
        <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-4 py-2">
            {messages.map((message, index) => (
            <div
                key={index}
                className={`${
                message.sender === 'me' ? 'text-right' : 'text-left'
                } mb-2`}
            >
                <strong>{message.sender}: </strong>
                <span
                className={`${
                    message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-300'
                } px-2 py-1 rounded-lg inline-block`}
                >
                {message.body}
                </span>
            </div>
            ))}
        </div>
        <div className="flex-none px-4 py-2">
            <div className="flex">
            <input
                type="text"
                value={inputText}
                onChange={event => setInputText(event.target.value)}
                className="flex-grow border border-gray-300 rounded-lg px-3 py-2 mr-2"
            />
            <button
                onClick={sendMessage}
                className="bg-blue-500 text-white rounded-lg px-3 py-2"
            >
                Send
            </button>
            </div>
        </div>
        </div>
    );
};

export default Chat;
