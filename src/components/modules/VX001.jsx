import React, { useState, useRef, useEffect } from 'react';
import vexoGif from '../../assets/images/vexo0.gif';

const VX001 = ({ user }) => {
  const [hasCamera, setHasCamera] = useState(false);
  const [error, setError] = useState(null);
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const enableCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setHasCamera(true);
          setIsStreamActive(true);
          startTimer();
        };
      }
    } catch (err) {
      setError('Camera access required for VTX protocol');
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'USER';

  return (
    <div className="h-[100px] border-b border-red-900/30 flex">
      {/* VX001-B: Control Center */}
      <div className="w-[260px] border-r border-red-900/30 bg-gradient-to-b from-gray-900 to-black relative p-2">
        <div className="flex items-center gap-1">
          <span className="text-red-500 font-mono text-m font-bold">VEXO escalator 1.0</span>
          {isStreamActive && (
            <span className="text-red-400 font-mono text-xxs">
              {formatTime(sessionTime)}
            </span>
          )}
        </div>
        
        <div className="text-red-400 font-mono text-xxs mt-1">
          {displayName}
        </div>

        {/* Only show enable button when stream is NOT active */}
        {!isStreamActive && !hasCamera && (
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
      </div>

      {/* VX001-A: Local Camera Feed */}
      <div className="w-[140px] bg-gray-900 relative">
        {/* Show video when stream is active */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${!isStreamActive ? 'hidden' : ''}`}
        />
        {/* Only show placeholder when stream is NOT active */}
        {!isStreamActive && !hasCamera && (
          <img 
            src={vexoGif} 
            alt="VEXO"
            className="w-full h-full object-cover"
          />
        )}
        {/* Show overlays when stream is active */}
        {isStreamActive && (
          <>
            <div className="absolute top-1 right-1 text-red-400 font-mono text-xxs font-bold">
              VTX ACTIVE
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VX001;
