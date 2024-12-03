import React from 'react';

const VX003 = () => {
  return (
    <div className="h-[250px] p-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="h-full border border-red-900/30 p-2">
        <div className="h-[180px] mb-2 overflow-y-auto text-gray-400">
  &gt; CHAT INITIALIZED...<br/>
  &gt; AWAITING INPUT...
</div>

        <input 
          type="text" 
          className="w-full bg-black border border-red-900/30 p-2 text-gray-300 focus:outline-none focus:border-pink-700/50 placeholder-gray-600"
          placeholder="> ENTER MESSAGE..."
        />
      </div>
    </div>
  );
};

export default VX003;