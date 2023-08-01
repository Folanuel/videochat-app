import React from 'react'
import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Chatbox from './components/Chatbox';
import Chat from './components/Chat';
import Notifications from './components/Notifications';


function App() {
  return (
    <div className="w-full h-full">
      <h1 className='w-fit text-black bg-white flex text-center text-3xl mt-5 p-4 mb-8 font-bold mx-auto'>Video App</h1>
      <VideoPlayer />
      {/* <Chatbox /> */}
      <Chat />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
}

export default App;
