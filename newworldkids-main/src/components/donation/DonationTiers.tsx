
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, Leaf, Trees } from 'lucide-react';

const DonationTiers = () => {
  const tiers = [
    {
      name: "Seed",
      icon: <Sprout className="h-8 w-8" />,
      amount: "10-49",
      benefits: ["NFT Receipt", "Donor Badge", "Monthly Newsletter"],
      color: "bg-green-400/10 text-green-400",
      borderColor: "border-green-400/20"
    },
    {
      name: "Sprout",
      icon: <Leaf className="h-8 w-8" />,
      amount: "50-199",
      benefits: ["NFT Receipt", "Donor Badge", "Monthly Newsletter", "Educational Resources", "Quarterly Report"],
      color: "bg-blue-400/10 text-blue-400",
      borderColor: "border-blue-400/20"
    },
    {
      name: "Tree",
      icon: <Trees className="h-8 w-8" />,
      amount: "200+",
      benefits: ["NFT Receipt", "Donor Badge", "Monthly Newsletter", "Educational Resources", "Quarterly Report", "Exclusive Events", "Name on Donor Wall"],
      color: "bg-purple-400/10 text-purple-400",
      borderColor: "border-purple-400/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers.map((tier, index) => (
        <Card key={index} className={`glass-effect border ${tier.borderColor}`}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className={tier.color}>
                {tier.name} Tier
              </Badge>
              <div className={`p-2 rounded-full ${tier.color}`}>
                {tier.icon}
              </div>
            </div>
            <CardTitle>${tier.amount}</CardTitle>
            <CardDescription>Donation range</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tier.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="mr-2">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DonationTiers;
