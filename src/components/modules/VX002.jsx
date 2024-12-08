import React, { useEffect, useRef } from 'react';
import placeholderGif from '../../assets/images/placeholder0.gif';

const VX002 = ({ remoteStream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && remoteStream) {
      videoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div className="h-[250px] border-b border-red-900/30 bg-gradient-to-b from-gray-900 to-black">
      {!remoteStream ? (
        <div className="w-full h-full relative">
          <img 
            src={placeholderGif} 
            alt="Awaiting Connection"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 text-red-400 font-mono text-sm">
            AWAITING REMOTE CONNECTION...
          </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default VX002;
