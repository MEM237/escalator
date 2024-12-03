import React from 'react';
import VX001 from './modules/VX001';
import VX002 from './modules/VX002';
import VX003 from './modules/VX003';

const VTXWindow = () => {
  return (
    <div className="fixed top-4 right-4 w-[400px] h-[600px] bg-black border border-red-900/50 shadow-lg font-mono">
      <VX001 />
      <VX002 />
      <VX003 />
    </div>
  );
};

export default VTXWindow;