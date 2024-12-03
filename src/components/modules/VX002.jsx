import React, { useEffect, useRef } from 'react';

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
        <div className="w-full h-full flex items-center justify-center text-gray-600">
          AWAITING REMOTE CONNECTION...
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