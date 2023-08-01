import React from 'react'
import Webcam from "react-webcam"
import { SocketContext } from '../SocketContext'
import { useContext } from 'react';

const VideoPlayer = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
    return (
        <div className='w-fit h-full mb-8 mt-8 px-[400px]'>
        <div className='flex mx-auto space-x-4'>
        {
            stream && (
                <div className=' bg-white '>
                    <h1 className='font-bold text-center'>{name || 'Name'}</h1>
                    <Webcam audio={false} ref={myVideo} autoPlay  />
                </div>
            )
        }
        {
            callAccepted && !callEnded && (
                <div className='bg-white'>
                    <h1 className='font-bold text-green-700 text-center'>{call.name || 'Name'}</h1>
                    <Webcam audio ref={userVideo} autoPlay  />
                </div>
            )
        }
            
            
        </div>
        </div>
    )
}

export default VideoPlayer