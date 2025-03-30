
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import SyncJobCard from './SyncJobCard';

interface SyncJob {
  id: string;
  table: string;
  isRunning: boolean;
  lastRun: Date | null;
  interval: number;
}

interface SyncJobListProps {
  jobs: SyncJob[];
  syncingJobs: Record<string, boolean>;
  onRefresh: () => void;
}

const SyncJobList: React.FC<SyncJobListProps> = ({ jobs, syncingJobs, onRefresh }) => {
  if (jobs.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No sync jobs configured</AlertTitle>
        <AlertDescription>
          Add a collection above to start syncing data with Firebase.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <SyncJobCard 
          key={job.id} 
          job={job} 
          onRefresh={onRefresh} 
          syncing={syncingJobs[job.id] || false}
        />
      ))}
    </div>
  );
};

export default SyncJobList;
