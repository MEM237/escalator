import React, { useState, useEffect } from 'react';
import UserService from '../services/user-service';

const UserProfile = ({ userId, onUpdate }) => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const userData = await UserService.getProfile(userId);
      setProfile(userData);
      setDisplayName(userData.displayName);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await UserService.updateProfile(userId, { displayName });
      setIsEditing(false);
      onUpdate?.();
      loadProfile();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-red-400 font-mono">Loading profile...</div>;
  if (error) return <div className="text-red-500 font-mono">Error: {error}</div>;

  return (
    <div className="bg-gray-900 border border-red-900/50 p-6 rounded-sm">
      <h2 className="text-red-400 mb-4 font-mono">USER PROFILE</h2>
      
      {isEditing ? (
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full bg-black border border-red-900/30 p-2 text-gray-300 
                     focus:outline-none focus:border-pink-700/50 font-mono"
          />
          <div className="flex space-x-4">
            <button 
              type="submit"
              className="bg-gray-900 border border-red-800 px-4 py-2 
                       text-red-400 hover:bg-gray-800 hover:text-pink-400 
                       transition-colors font-mono"
            >
              SAVE
            </button>
            <button 
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-900 border border-red-800 px-4 py-2 
                       text-red-400 hover:bg-gray-800 hover:text-pink-400 
                       transition-colors font-mono"
            >
              CANCEL
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p className="text-gray-300 font-mono mb-4">
            Display Name: {profile.displayName}
          </p>
          <p className="text-gray-500 font-mono mb-4">
            Email: {profile.email}
          </p>
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-gray-900 border border-red-800 px-4 py-2 
                     text-red-400 hover:bg-gray-800 hover:text-pink-400 
                     transition-colors font-mono"
          >
            EDIT PROFILE
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;