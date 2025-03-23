
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DonationImpact = () => {
  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle>Your Impact</CardTitle>
        <CardDescription>
          See how your donations are making a difference
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 rounded-lg bg-white/5">
            <h3 className="text-3xl font-bold text-[#F2FF44]">150+</h3>
            <p className="text-white/80">Children Educated</p>
          </div>
          <div className="p-4 rounded-lg bg-white/5">
            <h3 className="text-3xl font-bold text-[#F2FF44]">25</h3>
            <p className="text-white/80">Schools Supported</p>
          </div>
          <div className="p-4 rounded-lg bg-white/5">
            <h3 className="text-3xl font-bold text-[#F2FF44]">10+</h3>
            <p className="text-white/80">Conservation Projects</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationImpact;
