import React from 'react';
export default function LoadingSpinner(){
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-transparent border-t-orange-500"></div>
    </div>
  );
}
