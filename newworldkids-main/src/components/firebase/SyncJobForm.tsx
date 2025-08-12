
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import syncScheduler from "@/utils/syncScheduler";

interface SyncJobFormProps {
  onJobAdded: () => void;
}

const SyncJobForm: React.FC<SyncJobFormProps> = ({ onJobAdded }) => {
  const [newTable, setNewTable] = useState("");
  const [interval, setInterval] = useState(15); // 15 minutes default
  const { toast } = useToast();

  const handleAddTable = () => {
    if (!newTable.trim()) {
      toast({
        title: "Error",
        description: "Please enter a table name",
        variant: "destructive",
      });
      return;
    }

    const jobId = `sync-${newTable}`;
    syncScheduler.addJob(jobId, newTable, interval);
    setNewTable("");
    onJobAdded();
    
    toast({
      title: "Table Added",
      description: `Added "${newTable}" to Firebase sync list`,
    });
  };

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-[#F2FF44]" />
          Add Firebase Collection to Sync
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Enter collection name"
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
          <Button onClick={handleAddTable}>Add Collection</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SyncJobForm;
