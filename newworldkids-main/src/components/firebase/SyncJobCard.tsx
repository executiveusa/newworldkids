
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, Play, Pause, Clock, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import syncScheduler from "@/utils/syncScheduler";

interface SyncJobCardProps {
  job: {
    id: string;
    table: string;
    isRunning: boolean;
    lastRun: Date | null;
    interval: number;
  };
  onRefresh: () => void;
  syncing: boolean;
}

const SyncJobCard: React.FC<SyncJobCardProps> = ({ job, onRefresh, syncing }) => {
  const { toast } = useToast();

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
    onRefresh();
  };

  const handleManualSync = async (jobId: string) => {
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
      onRefresh();
    }
  };

  return (
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
              disabled={syncing}
            >
              <RefreshCcw className={`mr-2 h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
              Sync Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SyncJobCard;
