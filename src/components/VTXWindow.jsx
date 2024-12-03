import React, { useState, useEffect } from 'react';
import VX001 from './modules/VX001';
import VX002 from './modules/VX002';
import VX003 from './modules/VX003';

const VTXWindow = () => {
  const [remoteStream, setRemoteStream] = useState(null);
  
  const handleMessage = (message) => {
    // Handle P2P message sending
    console.log('Sending message:', message);
    // Implement P2P message sending logic
  };

  return (
    <div className="fixed top-4 right-4 w-[400px] h-[600px] bg-black border border-red-900/50 shadow-lg font-mono">
      <VX001 />
      <VX002 remoteStream={remoteStream} />
      <VX003 onSendMessage={handleMessage} />
    </div>
  );
};

export default VTXWindow;