import React, { useState } from 'react';
import VTXWindow from './VTXWindow';

const WelcomeScreen = () => {
  const [showVTX, setShowVTX] = useState(false);

  return (
    <div className="min-h-screen bg-black text-gray-300 p-8 font-mono">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl mb-8 font-mono bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
          VEXO ESCALATOR 1.0
        </h1>
        <div className="bg-gray-900 border border-red-900/50 p-6 rounded-sm mb-6">
          <p className="mb-4 font-mono text-red-400">
            > INITIALIZING VEXO SYSTEMS...<br/>
            > ESTABLISHING SECURE CONNECTION...<br/>
            > READY FOR ACTIVATION...
          </p>
          <p className="mb-6 text-gray-400">
            VEXO Escalator 1.0 provides advanced peer-to-peer communication capabilities
            enhanced by artificial intelligence processing.
          </p>
          <button 
            onClick={() => setShowVTX(true)}
            className="bg-gray-900 border border-red-800 px-6 py-2 text-red-400 hover:bg-gray-800 hover:text-pink-400 transition-colors font-mono"
          >
            ENABLE CAM
          </button>
        </div>
      </div>
      {showVTX && <VTXWindow />}
    </div>
  );
};

export default WelcomeScreen;