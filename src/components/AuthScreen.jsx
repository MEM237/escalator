import React, { useState } from 'react';
import AuthService from '../services/auth-service';

const AuthScreen = ({ onAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await AuthService.login(email, password);
      } else {
        await AuthService.register(email, password);
      }
      onAuthenticated?.();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl mb-8 font-mono bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
          VEXO ESCALATOR 1.0
        </h1>
        
        <div className="bg-gray-900 border border-red-900/50 p-6 rounded-sm">
          <h2 className="text-red-400 mb-4 font-mono">
            {isLogin ? '> LOGIN' : '> REGISTER'}
          </h2>
          
          {error && (
            <div className="text-red-500 mb-4 font-mono">
              > ERROR: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL"
              className="w-full bg-black border border-red-900/30 p-2 text-gray-300 
                       focus:outline-none focus:border-pink-700/50 placeholder-gray-600
                       font-mono"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              className="w-full bg-black border border-red-900/30 p-2 text-gray-300 
                       focus:outline-none focus:border-pink-700/50 placeholder-gray-600
                       font-mono"
            />
            <button 
              type="submit"
              className="w-full bg-gray-900 border border-red-800 px-6 py-2 
                       text-red-400 hover:bg-gray-800 hover:text-pink-400 
                       transition-colors font-mono"
            >
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </button>
          </form>

          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="w-full mt-4 text-gray-500 hover:text-gray-400 font-mono"
          >
            {isLogin ? '> NEED AN ACCOUNT? REGISTER' : '> HAVE AN ACCOUNT? LOGIN'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;