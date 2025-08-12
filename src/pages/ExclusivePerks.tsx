
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Video, FileText, Users, Calendar, Star, Lock } from 'lucide-react';

const ExclusivePerks = () => {
  const perks = [
    {
      name: "Educational Webinars",
      description: "Exclusive webinars on blockchain technology and conservation",
      icon: <Video className="h-10 w-10" />,
      minDonation: 50,
      available: true
    },
    {
      name: "Digital Resource Library",
      description: "Access to our complete library of educational materials",
      icon: <FileText className="h-10 w-10" />,
      minDonation: 100,
      available: true
    },
    {
      name: "Community Events",
      description: "Invitations to virtual community events and networking",
      icon: <Users className="h-10 w-10" />,
      minDonation: 250,
      available: true
    },
    {
      name: "Monthly Expert Sessions",
      description: "Live Q&A sessions with blockchain experts and educators",
      icon: <Calendar className="h-10 w-10" />,
      minDonation: 500,
      available: false
    },
    {
      name: "VIP Recognition",
      description: "Your name featured on our website and annual report",
      icon: <Star className="h-10 w-10" />,
      minDonation: 1000,
      available: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Exclusive Donor Perks</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Enjoy special benefits and exclusive content as a thank you for your generous support.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {perks.map((perk, index) => (
            <Card key={index} className={`glass-effect relative overflow-hidden ${perk.available ? 'border-[#F2FF44]/20' : 'border-white/10'}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="bg-white/5">
                    ${perk.minDonation}+ Donation
                  </Badge>
                  {perk.available ? (
                    <Badge className="bg-[#F2FF44] text-black">Available</Badge>
                  ) : (
                    <Badge variant="outline" className="border-white/20 bg-white/5">Locked</Badge>
                  )}
                </div>
                <div className="my-4 flex justify-center">
                  <div className={`p-4 rounded-full ${perk.available ? 'bg-[#F2FF44]/10 text-[#F2FF44]' : 'bg-white/10 text-white/60'}`}>
                    {perk.icon}
                  </div>
                </div>
                <CardTitle className="text-center">{perk.name}</CardTitle>
                <CardDescription className="text-center">
                  {perk.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className={`w-full ${perk.available ? 'bg-[#F2FF44] text-black hover:bg-[#E2EF34]' : 'bg-white/10 text-white/60'}`}
                  disabled={!perk.available}
                >
                  {perk.available ? 'Access Now' : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Locked
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="mr-2 h-6 w-6 text-[#F2FF44]" />
              How to Unlock All Perks
            </CardTitle>
            <CardDescription>
              Increase your donation amount to unlock additional exclusive perks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white/80">
              All perks are cumulative, meaning higher donation tiers include all perks from lower tiers. 
              Your current donation total across all contributions determines which perks you can access.
            </p>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Your Current Status</h3>
              <p className="text-white/80 mb-4">You've donated a total of <span className="font-bold text-white">$175</span></p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to next tier ($250)</span>
                  <span>70%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2.5">
                  <div 
                    className="bg-[#F2FF44] h-2.5 rounded-full" 
                    style={{width: '70%'}}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#F2FF44] text-black hover:bg-[#E2EF34]">
              Make Additional Donation
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ExclusivePerks;
