import React, { useState } from 'react';
import UserService from '../services/user-service';
import AuthService from '../services/auth-service';

const DebugPanel = () => {
  const [logs, setLogs] = useState([]);
  const [testUser, setTestUser] = useState(null);

  const addLog = (message) => {
    setLogs(prev => [`${new Date().toLocaleTimeString()} - ${message}`, ...prev]);
  };

  const testUserRegistration = async () => {
    try {
      addLog('Testing user registration...');
      const testEmail = `test${Date.now()}@vexo.com`;
      const user = await AuthService.register(testEmail, 'test123');
      setTestUser(user);
      addLog(`✅ User registered: ${user.uid}`);
    } catch (error) {
      addLog(`❌ Registration failed: ${error.message}`);
    }
  };

  const testUserProfile = async () => {
    try {
      addLog('Fetching user profile...');
      const profile = await UserService.getProfile(testUser.uid);
      addLog(`✅ Profile found: ${JSON.stringify(profile)}`);
    } catch (error) {
      addLog(`❌ Profile fetch failed: ${error.message}`);
    }
  };

  const testUserSearch = async () => {
    try {
      addLog('Testing user search...');
      const results = await UserService.searchUsers('test');
      addLog(`✅ Search results: Found ${results.length} users`);
    } catch (error) {
      addLog(`❌ Search failed: ${error.message}`);
    }
  };

  const clearLogs = () => setLogs([]);

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-gray-900 border border-red-900/50 text-white p-4 rounded-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-red-400 font-mono">VEXO DEBUG PANEL</h3>
        <button 
          onClick={clearLogs}
          className="text-gray-500 hover:text-red-400 text-sm font-mono"
        >
          CLEAR LOGS
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <button
          onClick={testUserRegistration}
          className="w-full bg-gray-800 px-4 py-2 text-red-400 hover:bg-gray-700 font-mono"
        >
          TEST REGISTRATION
        </button>
        
        <button
          onClick={testUserProfile}
          disabled={!testUser}
          className="w-full bg-gray-800 px-4 py-2 text-red-400 hover:bg-gray-700 font-mono disabled:opacity-50"
        >
          TEST PROFILE
        </button>

        <button
          onClick={testUserSearch}
          className="w-full bg-gray-800 px-4 py-2 text-red-400 hover:bg-gray-700 font-mono"
        >
          TEST SEARCH
        </button>
      </div>

      <div className="h-48 overflow-y-auto border border-red-900/30 p-2 font-mono">
        {logs.map((log, index) => (
          <div key={index} className="text-xs text-gray-400 mb-1">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebugPanel;