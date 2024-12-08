import React, { useState, useEffect } from 'react';
import UserService from '../services/user-service';

const Connections = ({ userId }) => {
  const [connections, setConnections] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadConnections();
  }, [userId]);

  const loadConnections = async () => {
    try {
      setLoading(true);
      const userProfile = await UserService.getProfile(userId);
      const connectionsData = await UserService.getConnections(userId);
      
      setConnections(connectionsData);
      setPendingRequests(userProfile.pendingConnections || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requesterId) => {
    try {
      await UserService.acceptConnection(userId, requesterId);
      loadConnections(); // Reload the connections list
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-900 border border-red-900/50 p-6 rounded-sm">
      <h2 className="text-red-400 mb-4 font-mono">CONNECTIONS</h2>

      {error && (
        <div className="text-red-500 mb-4 font-mono">
          ERROR: {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400 font-mono">Loading connections...</p>
      ) : (
        <>
          {/* Pending Requests */}
          {pendingRequests.length > 0 && (
            <div className="mb-6">
              <h3 className="text-pink-400 mb-2 font-mono">PENDING REQUESTS</h3>
              <div className="space-y-4">
                {pendingRequests.map(request => (
                  <div 
                    key={request.userId}
                    className="flex items-center justify-between border border-red-900/30 p-4"
                  >
                    <p className="text-gray-300 font-mono">{request.userId}</p>
                    <button
                      onClick={() => handleAcceptRequest(request.userId)}
                      className="bg-gray-900 border border-red-800 px-4 py-2 
                               text-red-400 hover:bg-gray-800 hover:text-pink-400 
                               transition-colors font-mono"
                    >
                      ACCEPT
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Connections */}
          <div className="space-y-4">
            {connections.map(connection => (
              <div 
                key={connection.id}
                className="flex items-center justify-between border border-red-900/30 p-4"
              >
                <div>
                  <p className="text-gray-300 font-mono">{connection.displayName}</p>
                  <p className="text-gray-500 font-mono text-sm">
                    {connection.isOnline ? 'ONLINE' : 'OFFLINE'}
                  </p>
                </div>
                <button
                  onClick={() => {/* Implement chat/call action */}}
                  className="bg-gray-900 border border-red-800 px-4 py-2 
                           text-red-400 hover:bg-gray-800 hover:text-pink-400 
                           transition-colors font-mono"
                >
                  CONNECT
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Connections;