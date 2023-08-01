import React, { useContext } from 'react'
import { SocketContext } from '../SocketContext';

const Notifications = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);
    return (
        <>
        {call.isReceivingCall && !callAccepted && (
            <div className='flex pt-4 items-center justify-center space-x-1'>
            <h1 className='font-bold'>{call.name} </h1>
            <p> is calling:</p>
            <button type='button' className='bg-green-500 text-white px-2' onClick={answerCall}>
                Answer
            </button>
            </div>
        )}
    </>
    )
}

export default Notifications