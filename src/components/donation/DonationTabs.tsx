
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DonationTiers from './DonationTiers';
import TopDonors from './TopDonors';
import DonationImpact from './DonationImpact';

const DonationTabs = () => {
  return (
    <Tabs defaultValue="tiers" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tiers">Donation Tiers</TabsTrigger>
        <TabsTrigger value="leaderboard">Top Donors</TabsTrigger>
        <TabsTrigger value="impact">Impact</TabsTrigger>
      </TabsList>
      <TabsContent value="tiers">
        <DonationTiers />
      </TabsContent>
      <TabsContent value="leaderboard">
        <TopDonors />
      </TabsContent>
      <TabsContent value="impact">
        <DonationImpact />
      </TabsContent>
    </Tabs>
  );
};

export default DonationTabs;
