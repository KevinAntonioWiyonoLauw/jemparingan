import React from 'react';

interface BottomNavProps {
  activeTab?: 'explore' | 'saved' | 'updates';
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab = 'explore' }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto grid grid-cols-3 h-16">
        <button 
          className={`flex flex-col items-center justify-center gap-1 ${
            activeTab === 'explore' ? 'text-pink-500' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            activeTab === 'explore' ? 'bg-pink-100' : ''
          }`}>
            <span className="text-lg">📍</span>
          </div>
          <span className="text-xs font-medium">Explore</span>
        </button>
        
        <button 
          className={`flex flex-col items-center justify-center gap-1 ${
            activeTab === 'saved' ? 'text-pink-500' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <span className="text-2xl">🔖</span>
          <span className="text-xs">Saved</span>
        </button>
        
        <button 
          className={`flex flex-col items-center justify-center gap-1 ${
            activeTab === 'updates' ? 'text-pink-500' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <span className="text-2xl">🔔</span>
          <span className="text-xs">Updates</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
