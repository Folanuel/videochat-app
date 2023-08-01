import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { MdOutlineAssignment, MdPhone, MdPhoneDisabled } from 'react-icons/md'
import { SocketContext } from '../SocketContext'
import { useContext, useState } from 'react';

const Options = ({children}) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');

    return (
        <div className='w-fit h-full bg-white mb-8 justify-center items-center p-8 ml-[450px]'>        
            <form noValidate autoComplete='off' className='grid grid-cols-2 gap-4'>                
                    <div className=''>
                        <h6 className='pb-4 font-bold'>Account information</h6>
                        <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}  className='pb-4'/>
                        <CopyToClipboard text={me} >
                            <button type='button' className='bg-blue-800 border border-black text-white flex px-4 py-2 pb-4'><p>COPY YOUR ID</p> <MdOutlineAssignment className='text-xl'/></button>
                        </CopyToClipboard>
                    </div>
                    <div className=''>
                        <h6 className='pb-4 font-bold'>Make a call</h6>
                        <input placeholder='ID to call' value={idToCall} onChange={(e) => setIdToCall(e.target.value)}  className='pb-4'/>
                        {callAccepted && !callEnded ? (
                        <button type='button' onClick={leaveCall}  className='bg-red-800 text-white border border-black flex px-4 py-2 pb-4' >
                        <p>Hang Up</p> <MdPhoneDisabled className='text-xl'/>  
                        </button>
                    ) : (
                        <button type='button' onClick={(e) => callUser(idToCall)}  className='bg-blue-800 text-white border border-black flex px-4 py-2 pb-4'>
                        <p>Call</p> <MdPhone className='text-xl'/> 
                        </button>
                    )}
                    </div>                
            </form>
        
        {children}
        </div>
    )
}

export default Options