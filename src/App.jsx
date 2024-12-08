import React, { useState, useEffect } from 'react';
import AuthScreen from './components/AuthScreen';
import WelcomeScreen from './components/WelcomeScreen';
import AuthService from './services/auth-service';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-400 font-mono">INITIALIZING...</p>
      </div>
    );
  }

  return user ? (
    <WelcomeScreen user={user} />
  ) : (
    <AuthScreen onAuthenticated={() => {}} />
  );
};

export default App;
