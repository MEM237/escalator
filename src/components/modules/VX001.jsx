import React, { useState, useRef, useEffect } from 'react';
import vexoGif from '../../assets/images/vexo0.gif';

const VX001 = ({ user }) => {
  const [hasCamera, setHasCamera] = useState(false);
  const [error, setError] = useState(null);
  const [isStreamActive, setIsStreamActive] = useState(false); // Add this new state
  const videoRef = useRef(null);

  const enableCamera = async () => {
    console.log('Attempting to enable camera...');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('Camera access granted:', stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          console.log('Video element ready to play');
          videoRef.current.play();
          setHasCamera(true);
          setIsStreamActive(true); // Set stream as active when video starts playing
        };
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Camera access required for VTX protocol');
    }
  };

  // Monitor video stream state
  useEffect(() => {
    if (videoRef.current?.srcObject) {
      console.log('Stream state:', isStreamActive ? 'active' : 'inactive');
    }
  }, [isStreamActive]);

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'USER';

  return (
    <div className="h-[100px] border-b border-red-900/30 flex">
      {/* VX001-B: Control Center */}
      <div className="w-[260px] border-r border-red-900/30 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute top-2 left-2 text-red-400 font-mono text-sm">
          {displayName}
        </div>
        
        {/* Only show button if camera is not active */}
        {!isStreamActive && (
          <div className="absolute bottom-2 right-2">
            <button 
              onClick={enableCamera}
              className="bg-gray-900 border border-red-800 px-4 py-2 
                       text-red-400 hover:bg-gray-800 hover:text-pink-400 
                       transition-colors font-mono text-sm"
            >
              ENABLE CAM
            </button>
          </div>
        )}
        
        {error && (
          <div className="absolute bottom-2 left-2 text-red-500 text-xs">
            {error}
          </div>
        )}
        
        {isStreamActive && (
          <div className="absolute top-2 right-2 text-red-400 font-mono text-xs">
            VTX ACTIVE
          </div>
        )}
      </div>

      {/* VX001-A: Local Camera Feed */}
      <div className="w-[140px] bg-gray-900">
        {/* Show video element always, but only display placeholder when stream is not active */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${!isStreamActive ? 'hidden' : ''}`}
        />
        {!isStreamActive && (
          <img 
            src={vexoGif} 
            alt="VEXO"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default VX001;
