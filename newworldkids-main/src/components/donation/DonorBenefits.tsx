
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star, Gift, ChevronRight } from "lucide-react";

const DonorBenefits = () => {
  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="text-xl">Donor Benefits</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Award className="h-5 w-5 text-[#F2FF44] mt-0.5" />
          <div>
            <h4 className="font-medium">NFT Receipt</h4>
            <p className="text-sm text-white/60">Receive a unique NFT for each donation</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Star className="h-5 w-5 text-[#F2FF44] mt-0.5" />
          <div>
            <h4 className="font-medium">Special Badges</h4>
            <p className="text-sm text-white/60">Unlock special badges for donation milestones</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Gift className="h-5 w-5 text-[#F2FF44] mt-0.5" />
          <div>
            <h4 className="font-medium">Exclusive Perks</h4>
            <p className="text-sm text-white/60">Access to exclusive educational content</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/exclusive-perks" className="text-[#F2FF44] text-sm flex items-center">
          Learn more about perks
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DonorBenefits;
