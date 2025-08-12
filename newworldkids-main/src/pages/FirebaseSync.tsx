
import React from 'react';
import SyncManager from '@/components/SyncManager';

const FirebaseSync = () => {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 font-archivo brand-gradient">
            <span className="shimmer-effect">Firebase Sync</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Manage data synchronization between your application and Firebase
          </p>
        </div>
        
        <SyncManager />
      </div>
    </div>
  );
};

export default FirebaseSync;
