
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DonationProgressProps {
  currentAmount: number;
  goalAmount: number;
  progressPercentage: number;
}

const DonationProgress = ({ 
  currentAmount, 
  goalAmount, 
  progressPercentage 
}: DonationProgressProps) => {
  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="text-xl">Donation Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progressPercentage} className="h-3 bg-white/10" />
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-white">
                ${currentAmount.toLocaleString()}
              </p>
              <p className="text-sm text-white/60">raised of ${goalAmount.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 px-3 py-1 rounded-full">
              <p className="text-sm font-medium">{progressPercentage.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationProgress;
