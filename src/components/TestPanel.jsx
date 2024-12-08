import React, { useState } from 'react';
import AuthService from '../services/auth-service';

const TestPanel = () => {
  const [testUser, setTestUser] = useState(null);

  const toggleTestUser = async () => {
    try {
      const user = await AuthService.toggleTestUser();
      setTestUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 bg-gray-900 border border-red-900/50 p-4 rounded-sm">
      <h3 className="text-red-400 font-mono mb-2">TEST CONTROLS</h3>
      <button
        onClick={toggleTestUser}
        className="bg-gray-800 px-4 py-2 text-red-400 hover:bg-gray-700 font-mono text-sm"
      >
        {testUser ? 'DISCONNECT TEST USER' : 'CREATE TEST USER'}
      </button>
    </div>
  );
};

export default TestPanel;