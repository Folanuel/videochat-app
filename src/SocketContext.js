import React, { createContext, useState, useRef, useEffect } from 'react';
import { connect, io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('https://video-server-1wg8.onrender.com/');


const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
            setStream(currentStream);

            myVideo.current.srcObject = currentStream;
        
            });
        socket.on('me', (id) => setMe(id));

        socket.on('callUser', ({ from, name: callerName, signal }) => {
        setCall({ isReceivingCall: true, from, name: callerName, signal });
        });

        socket.on('message', message => {
        console.log('Received message:', message);
        setMessages([...messages, message]);
        });

    

    // .catch((err) => {
    //     console.error(err);
    // });
    }, []);


    


    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
        socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
        userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
        socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });

        peer.on('stream', (currentStream) => {
        userVideo.current.srcObject = currentStream;
        });

        socket.on('callAccepted', (signal) => {
        setCallAccepted(true);

        peer.signal(signal);
        
    });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        // connectionRef.current.destroy();

        window.location.reload();
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (connectionRef.current && inputText.trim() !== '') {
            const messageObject = {
            body: inputText,
            sender: me,
            };
            
            setMessages((messages) => [...messages, messageObject]);
            setInputText('');

            socket.emit('send-message', messageObject);
        }
    };

    return (
        <SocketContext.Provider value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        messages, 
        inputText, 
        setInputText, 
        sendMessage 
        }}
        >
        {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };
