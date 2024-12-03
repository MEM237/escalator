import React, { useState, useEffect, useRef } from 'react';
import geminiService from '../../services/gemini-service';

const VX003 = () => {
  console.log('VX003: Component mounting');
  
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatRef = useRef(null);

  useEffect(() => {
    console.log('VX003: Component mounted');
    // Test Gemini service
    geminiService.initializeChat()
      .then(() => console.log('Gemini chat initialized'))
      .catch(err => console.error('Gemini initialization error:', err));
  }, []);

  return (
    <div className="h-[250px] p-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="h-full border border-red-900/30 p-2">
        <div 
          ref={chatRef}
          className="h-[180px] mb-2 overflow-y-auto text-gray-400 font-mono"
        >
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              {`> ${msg.text}`}
            </div>
          ))}
        </div>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full bg-black border border-red-900/30 p-2 text-gray-300 
                   focus:outline-none focus:border-pink-700/50 placeholder-gray-600
                   font-mono"
          placeholder="> ENTER MESSAGE..."
        />
      </div>
    </div>
  );
};

export default VX003;