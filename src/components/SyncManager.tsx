
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { RefreshCcw, Play, Pause, Clock, Database, AlertCircle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/hooks/use-toast";
import syncScheduler from "@/utils/syncScheduler";

const SyncManager: React.FC = () => {
  const [tables, setTables] = useState<string[]>([]);
  const [newTable, setNewTable] = useState("");
  const [interval, setInterval] = useState(15); // 15 minutes default
  const [jobs, setJobs] = useState<any[]>([]);
  const [syncing, setSyncing] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  // Load existing jobs on component mount
  useEffect(() => {
    refreshJobs();
  }, []);

  const refreshJobs = () => {
    const currentJobs = syncScheduler.getAllJobs();
    setJobs(currentJobs);
  };

  const handleAddTable = () => {
    if (!newTable.trim()) {
      toast({
        title: "Error",
        description: "Please enter a table name",
        variant: "destructive",
      });
      return;
    }

    // Check if the table is already added
    if (tables.includes(newTable)) {
      toast({
        title: "Error",
        description: `Table "${newTable}" is already added`,
        variant: "destructive",
      });
      return;
    }

    // Add the table to the list
    setTables([...tables, newTable]);
    
    // Add a sync job for this table
    const jobId = `sync-${newTable}`;
    syncScheduler.addJob(jobId, newTable, interval);
    setNewTable("");
    refreshJobs();
    
    toast({
      title: "Table Added",
      description: `Added "${newTable}" to sync list`,
    });
  };

  const toggleSync = (jobId: string, isRunning: boolean) => {
    if (isRunning) {
      syncScheduler.stopJob(jobId);
      toast({
        title: "Sync Stopped",
        description: `Stopped sync for ${jobId.replace('sync-', '')}`,
      });
    } else {
      syncScheduler.startJob(jobId);
      toast({
        title: "Sync Started",
        description: `Started sync for ${jobId.replace('sync-', '')}`,
      });
    }
    refreshJobs();
  };

  const handleManualSync = async (jobId: string) => {
    setSyncing(prev => ({ ...prev, [jobId]: true }));
    
    try {
      const result = await syncScheduler.manualSync(jobId);
      toast({
        title: result.success ? "Sync Complete" : "Sync Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Sync Error",
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setSyncing(prev => ({ ...prev, [jobId]: false }));
      refreshJobs();
    }
  };

  return (
    <div className="space-y-8">
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-[#F2FF44]" />
            Add Table to Sync
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Enter table name"
              value={newTable}
              onChange={(e) => setNewTable(e.target.value)}
              className="flex-grow"
            />
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                max={60}
                value={interval}
                onChange={(e) => setInterval(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-white/70 whitespace-nowrap">minutes</span>
            </div>
            <Button onClick={handleAddTable}>Add Table</Button>
          </div>
        </CardContent>
      </Card>

      {jobs.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No sync jobs configured</AlertTitle>
          <AlertDescription>
            Add a table above to start syncing data between Supabase and Firebase.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-[#F2FF44]" />
                    {job.table}
                  </CardTitle>
                  <Badge variant={job.isRunning ? "default" : "outline"}>
                    {job.isRunning ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Clock className="h-4 w-4" />
                    <span>
                      {job.isRunning 
                        ? `Syncs every ${job.interval} minutes` 
                        : `Will sync every ${job.interval} minutes when active`}
                    </span>
                  </div>
                  
                  {job.lastRun && (
                    <div className="text-sm">
                      Last sync: {new Date(job.lastRun).toLocaleString()}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button 
                      variant={job.isRunning ? "destructive" : "default"}
                      onClick={() => toggleSync(job.id, job.isRunning)}
                    >
                      {job.isRunning ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Start
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleManualSync(job.id)}
                      disabled={syncing[job.id]}
                    >
                      <RefreshCcw className={`mr-2 h-4 w-4 ${syncing[job.id] ? 'animate-spin' : ''}`} />
                      Sync Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="p-6 rounded-lg bg-white/5 backdrop-blur border border-white/10">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Firebase Sync Configuration</h3>
          <p className="text-white/70 text-sm mb-4">
            Ensure your Firebase configuration is set in your environment variables for this feature to work properly.
          </p>
          <div className="aspect-w-16 aspect-h-9 max-w-md mx-auto">
            <AspectRatio ratio={16 / 9}>
              <div className="h-full w-full flex items-center justify-center bg-black/30 rounded-lg">
                <Database className="h-12 w-12 text-[#F2FF44]" />
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyncManager;
