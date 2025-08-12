
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Lock } from 'lucide-react';

const SpecialNFTBadges = () => {
  const badges = [
    {
      name: "Early Supporter",
      description: "Awarded to the first 100 donors",
      image: "https://placehold.co/200/1a1a1a/F2FF44?text=Early+Supporter",
      unlocked: true,
      progress: 100
    },
    {
      name: "Consistent Giver",
      description: "Donate for 3 consecutive months",
      image: "https://placehold.co/200/1a1a1a/F2FF44?text=Consistent+Giver",
      unlocked: true,
      progress: 100
    },
    {
      name: "Education Hero",
      description: "Support 10 different educational projects",
      image: "https://placehold.co/200/1a1a1a/F2FF44?text=Education+Hero",
      unlocked: false,
      progress: 60
    },
    {
      name: "Conservation Champion",
      description: "Support wildlife conservation efforts with $500+ in donations",
      image: "https://placehold.co/200/1a1a1a/F2FF44?text=Conservation+Champion",
      unlocked: false,
      progress: 40
    },
    {
      name: "Community Leader",
      description: "Refer 5 friends who make donations",
      image: "https://placehold.co/200/1a1a1a/F2FF44?text=Community+Leader",
      unlocked: false,
      progress: 20
    },
    {
      name: "Blockchain Pioneer",
      description: "Complete all blockchain education modules",
      image: "https://placehold.co/200/1a1a1a/F2FF44?text=Blockchain+Pioneer",
      unlocked: false,
      progress: 0
    }
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Special NFT Badges</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Unlock exclusive badge NFTs by reaching specific milestones in your donation journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {badges.map((badge, index) => (
          <Card key={index} className={`glass-effect ${badge.unlocked ? 'border-[#F2FF44]/30' : 'border-white/10'}`}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className={`mr-2 h-5 w-5 ${badge.unlocked ? 'text-[#F2FF44]' : 'text-white/60'}`} />
                {badge.name}
              </CardTitle>
              <CardDescription>{badge.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative rounded-lg overflow-hidden aspect-square">
                <img 
                  src={badge.image} 
                  alt={badge.name} 
                  className={`w-full h-full object-cover ${!badge.unlocked && 'filter grayscale opacity-50'}`} 
                />
                {!badge.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Lock className="h-10 w-10 text-white/80" />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{badge.progress}%</span>
                </div>
                <Progress value={badge.progress} className="h-2" />
              </div>
              
              <Button 
                disabled={!badge.unlocked} 
                className={badge.unlocked ? "w-full bg-[#F2FF44] text-black hover:bg-[#E2EF34]" : "w-full"}
              >
                {badge.unlocked ? 'View Badge' : 'Locked'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SpecialNFTBadges;
