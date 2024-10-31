import React from 'react';

const LinesWithCircleDivider = () => {
  return (
    <div className="flex items-center justify-center gap-2 py-10">
      <div className="w-20 h-[1px] bg-gray-200"></div>
      <div className="bg-gray-200 w-2 h-2 rounded-full"></div>
      <div className="w-20 h-[1px] bg-gray-200"></div>
    </div>
  );
};

export default LinesWithCircleDivider;
