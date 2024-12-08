import React, { useState } from 'react';
import UserService from '../services/user-service';

const UserSearch = ({ currentUserId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const results = await UserService.searchUsers(searchTerm);
      // Filter out current user from results
      setSearchResults(results.filter(user => user.id !== currentUserId));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendRequest = async (userId) => {
    try {
      await UserService.sendConnectionRequest(currentUserId, userId);
      // Update UI to show pending status
      setSearchResults(results => 
        results.map(user => 
          user.id === userId 
            ? { ...user, requestSent: true }
            : user
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-900 border border-red-900/50 p-6 rounded-sm">
      <h2 className="text-red-400 mb-4 font-mono">SEARCH USERS</h2>
      
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="SEARCH BY NAME"
          className="flex-1 bg-black border border-red-900/30 p-2 text-gray-300 
                   focus:outline-none focus:border-pink-700/50 placeholder-gray-600
                   font-mono"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-gray-900 border border-red-800 px-4 py-2 
                   text-red-400 hover:bg-gray-800 hover:text-pink-400 
                   transition-colors font-mono disabled:opacity-50"
        >
          {loading ? 'SEARCHING...' : 'SEARCH'}
        </button>
      </div>

      {error && (
        <div className="text-red-500 mb-4 font-mono">
          ERROR: {error}
        </div>
      )}

      <div className="space-y-4">
        {searchResults.map(user => (
          <div 
            key={user.id}
            className="flex items-center justify-between border border-red-900/30 p-4"
          >
            <div>
              <p className="text-gray-300 font-mono">{user.displayName}</p>
              <p className="text-gray-500 font-mono text-sm">{user.email}</p>
            </div>
            <button
              onClick={() => sendRequest(user.id)}
              disabled={user.requestSent}
              className="bg-gray-900 border border-red-800 px-4 py-2 
                       text-red-400 hover:bg-gray-800 hover:text-pink-400 
                       transition-colors font-mono disabled:opacity-50"
            >
              {user.requestSent ? 'REQUEST SENT' : 'CONNECT'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;