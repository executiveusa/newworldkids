
import React, { useState, useEffect } from 'react';
import SyncJobForm from './firebase/SyncJobForm';
import SyncJobList from './firebase/SyncJobList';
import FirebaseConfigInfo from './firebase/FirebaseConfigInfo';
import syncScheduler from "@/utils/syncScheduler";

const SyncManager: React.FC = () => {
  const [tables, setTables] = useState<string[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [syncing, setSyncing] = useState<Record<string, boolean>>({});

  useEffect(() => {
    refreshJobs();
  }, []);

  const refreshJobs = () => {
    const currentJobs = syncScheduler.getAllJobs();
    setJobs(currentJobs);
  };

  const handleSyncStart = (jobId: string) => {
    setSyncing(prev => ({ ...prev, [jobId]: true }));
  };

  const handleSyncEnd = (jobId: string) => {
    setSyncing(prev => ({ ...prev, [jobId]: false }));
  };

  return (
    <div className="space-y-8">
      <SyncJobForm onJobAdded={refreshJobs} />
      
      <SyncJobList 
        jobs={jobs} 
        syncingJobs={syncing} 
        onRefresh={refreshJobs} 
      />
      
      <FirebaseConfigInfo />
    </div>
  );
};

export default SyncManager;
