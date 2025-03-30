
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PlayCircle, PauseCircle, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import syncScheduler from '@/utils/syncScheduler';
import { syncToFirebase } from '@/integrations/firebase/client';

type SyncJobStatus = {
  id: string;
  table: string;
  isRunning: boolean;
  lastRun: Date | null;
  interval: number;
};

type SyncResult = {
  success: boolean;
  message: string;
  count: number;
};

const DEFAULT_TABLES = ['blogPosts', 'users', 'donations'];

const SyncManager = () => {
  const [jobs, setJobs] = useState<SyncJobStatus[]>([]);
  const [newJobTable, setNewJobTable] = useState('');
  const [newJobInterval, setNewJobInterval] = useState(15);
  const [syncResults, setSyncResults] = useState<Record<string, SyncResult | null>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    // Initialize with some default jobs if none exist
    if (syncScheduler.getAllJobs().length === 0) {
      DEFAULT_TABLES.forEach(table => {
        syncScheduler.addJob(table, table, 15);
      });
    }
    
    // Update the jobs state
    updateJobsList();
    
    // Set interval to refresh job statuses
    const intervalId = setInterval(updateJobsList, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const updateJobsList = () => {
    setJobs(syncScheduler.getAllJobs());
  };

  const handleAddJob = () => {
    if (!newJobTable.trim()) {
      toast({
        title: "Error",
        description: "Please enter a table name",
        variant: "destructive"
      });
      return;
    }

    const jobId = `job_${Date.now()}`;
    syncScheduler.addJob(jobId, newJobTable.trim(), newJobInterval);
    updateJobsList();
    
    toast({
      title: "Success",
      description: `Added new sync job for table ${newJobTable}`,
    });
    
    setNewJobTable('');
  };

  const handleToggleJob = (jobId: string, isRunning: boolean) => {
    if (isRunning) {
      syncScheduler.stopJob(jobId);
    } else {
      syncScheduler.startJob(jobId);
    }
    updateJobsList();
    
    toast({
      title: isRunning ? "Job Stopped" : "Job Started",
      description: `Sync job ${isRunning ? 'stopped' : 'started'} successfully`,
    });
  };

  const handleManualSync = async (jobId: string, table: string) => {
    setIsLoading(prev => ({ ...prev, [jobId]: true }));
    setSyncResults(prev => ({ ...prev, [jobId]: null }));
    
    try {
      const result = await syncScheduler.manualSync(jobId);
      setSyncResults(prev => ({ ...prev, [jobId]: result }));
      
      toast({
        title: result.success ? "Sync Successful" : "Sync Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      setSyncResults(prev => ({ 
        ...prev, 
        [jobId]: { 
          success: false, 
          message: String(error), 
          count: 0 
        } 
      }));
      
      toast({
        title: "Sync Error",
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [jobId]: false }));
      updateJobsList();
    }
  };

  const formatLastRun = (date: Date | null) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleString();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Firebase Sync Manager</h1>
      
      <Card className="mb-8 glass-effect border-0">
        <CardHeader>
          <CardTitle>Add New Sync Job</CardTitle>
          <CardDescription>Configure a new database table to sync to Firebase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="table-name">Table Name</Label>
                <Input 
                  id="table-name" 
                  value={newJobTable} 
                  onChange={(e) => setNewJobTable(e.target.value)}
                  placeholder="e.g. users, posts, etc."
                />
              </div>
              <div>
                <Label htmlFor="sync-interval">Sync Interval (minutes)</Label>
                <Input 
                  id="sync-interval" 
                  type="number" 
                  min={1}
                  value={newJobInterval} 
                  onChange={(e) => setNewJobInterval(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddJob}>Add Sync Job</Button>
        </CardFooter>
      </Card>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Active Sync Jobs</h2>
      
      {jobs.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No sync jobs</AlertTitle>
          <AlertDescription>
            Add a new sync job to start syncing data to Firebase.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <Card key={job.id} className="glass-effect border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">{job.table}</CardTitle>
                  <div className="flex items-center space-x-2">
                    {job.isRunning ? (
                      <div className="flex items-center text-green-500">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                        Active
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-500">
                        <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                        Inactive
                      </div>
                    )}
                  </div>
                </div>
                <CardDescription>
                  Sync interval: {job.interval} minutes | Last run: {formatLastRun(job.lastRun)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {syncResults[job.id] && (
                  <Alert className={syncResults[job.id]?.success ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}>
                    {syncResults[job.id]?.success ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertTitle>
                      {syncResults[job.id]?.success ? "Sync Successful" : "Sync Failed"}
                    </AlertTitle>
                    <AlertDescription>
                      {syncResults[job.id]?.message}
                      {syncResults[job.id]?.success && ` (${syncResults[job.id]?.count} records)`}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => handleToggleJob(job.id, job.isRunning)}
                >
                  {job.isRunning ? (
                    <>
                      <PauseCircle className="mr-2 h-4 w-4" />
                      Stop Sync
                    </>
                  ) : (
                    <>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Start Sync
                    </>
                  )}
                </Button>
                <Button 
                  variant="default"
                  onClick={() => handleManualSync(job.id, job.table)}
                  disabled={isLoading[job.id]}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isLoading[job.id] ? 'animate-spin' : ''}`} />
                  Sync Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SyncManager;
