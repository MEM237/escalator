import React, { useEffect, useRef } from 'react';

const VX001 = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    async function enableCamera() {
      try {
        console.log("Attempting to access camera...");
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 140 }, 
            height: { ideal: 100 } 
          }, 
          audio: false 
        });
        
        if (videoRef.current) {
          console.log("Camera access granted, setting stream...");
          videoRef.current.srcObject = stream;
          // Force a play attempt
          try {
            await videoRef.current.play();
            console.log("Video playback started");
          } catch (playError) {
            console.error("Error playing video:", playError);
          }
        }
      } catch (err) {
        console.error("Camera access error:", err);
      }
    }

    enableCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="h-[100px] border-b border-red-900/30 flex">
      <div className="w-[260px] border-r border-red-900/30 p-4 text-gray-400 bg-gradient-to-b from-gray-900 to-black">
        VEXO 1.0 - LOCAL FEED INITIALIZING
      </div>
      <div className="w-[140px] p-2 bg-gray-900">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          className="bg-black border border-red-900/20"
        />
      </div>
    </div>
  );
};

export default VX001;