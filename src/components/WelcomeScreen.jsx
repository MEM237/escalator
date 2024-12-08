import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import VTXWindow from './VTXWindow';
import escalatorGif from '../assets/images/escalator0.gif';

const WelcomeScreen = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setShowWelcome(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8 flex justify-center items-start gap-4">
      {/* Welcome Window */}
      {showWelcome && (
        <div className="w-[400px] h-[600px] bg-black border border-red-900/50">
          <div className="p-6">
            <h1 className="text-4xl mb-8 font-mono bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
              VEXO ESCALATOR 1.0
            </h1>

            <p className="text-red-400 font-mono mb-8">
              > ELEVATE EVERY CONNECTION
            </p>

            {error && (
              <div className="text-red-500 font-mono mb-4">
                {error}
              </div>
            )}

            <button 
              onClick={handleGoogleSignIn}
              className="w-full bg-gray-900 border border-red-800 px-6 py-2 
                       text-red-400 hover:bg-gray-800 hover:text-pink-400 
                       transition-colors font-mono mb-6"
            >
              AUTHENTICATE WITH GOOGLE
            </button>

            <p className="text-gray-400 font-mono text-sm">
              > VTX PROTOCOL REQUIRES CAMERA ACCESS AND GOOGLE AUTHENTICATION
            </p>
          </div>
        </div>
      )}

      {/* VTX Window */}
      <div className={`w-[400px] h-[600px] bg-black border border-red-900/50 overflow-hidden ${!showWelcome ? 'fixed top-4 right-4' : ''}`}>
        {user ? (
          <VTXWindow user={user} />
        ) : (
          <img 
            src={escalatorGif} 
            alt="VEXO Escalator"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;