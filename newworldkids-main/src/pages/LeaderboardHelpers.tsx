
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Medal, Trophy, Award } from 'lucide-react';

const LeaderboardHelpers = () => {
  const individuals = [
    { name: "Sarah Johnson", amount: 5000, avatar: "/avatars/sarah.png" },
    { name: "Michael Chen", amount: 3500, avatar: "/avatars/michael.png" },
    { name: "Aisha Williams", amount: 2000, avatar: "/avatars/aisha.png" },
    { name: "James Rodriguez", amount: 1750, avatar: "/avatars/james.png" },
    { name: "Emma Thompson", amount: 1500, avatar: "/avatars/emma.png" },
    { name: "Raj Patel", amount: 1250, avatar: "/avatars/raj.png" },
    { name: "Maria Garcia", amount: 1000, avatar: "/avatars/maria.png" },
    { name: "David Kim", amount: 850, avatar: "/avatars/david.png" },
    { name: "Lisa Wong", amount: 750, avatar: "/avatars/lisa.png" },
    { name: "Jamal Brown", amount: 650, avatar: "/avatars/jamal.png" },
    { name: "Sophie Martin", amount: 500, avatar: "/avatars/sophie.png" },
    { name: "Carlos Sanchez", amount: 450, avatar: "/avatars/carlos.png" },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Individual Donors Leaderboard</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Celebrating individuals who are making a difference through their generous contributions.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {individuals.slice(0, 3).map((individual, index) => (
            <Card key={index} className={`glass-effect relative overflow-hidden ${
              index === 0 ? 'border-[#F2FF44]/30' : 
              index === 1 ? 'border-[#C0C0C0]/30' : 
              'border-[#CD7F32]/30'
            }`}>
              <div className={`absolute top-0 right-0 w-20 h-20 ${
                index === 0 ? 'bg-[#F2FF44]/10' : 
                index === 1 ? 'bg-[#C0C0C0]/10' : 
                'bg-[#CD7F32]/10'
              } rounded-full -mr-10 -mt-10 z-0`}></div>
              <CardHeader className="text-center relative z-10">
                <div className="mx-auto">
                  {index === 0 && <Trophy className="h-10 w-10 text-[#F2FF44] mx-auto mb-2" />}
                  {index === 1 && <Medal className="h-10 w-10 text-[#C0C0C0] mx-auto mb-2" />}
                  {index === 2 && <Award className="h-10 w-10 text-[#CD7F32] mx-auto mb-2" />}
                  <Avatar className="h-20 w-20 mx-auto border-4 border-white/10">
                    <AvatarFallback className="text-2xl">
                      {individual.name.split(' ')[0][0] + individual.name.split(' ')[1][0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="mt-4">{individual.name}</CardTitle>
                <CardDescription>
                  {index === 0 ? 'Gold Donor' : index === 1 ? 'Silver Donor' : 'Bronze Donor'}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <p className={`text-2xl font-bold ${
                  index === 0 ? 'text-[#F2FF44]' : 
                  index === 1 ? 'text-[#C0C0C0]' : 
                  'text-[#CD7F32]'
                }`}>
                  ${individual.amount.toLocaleString()}
                </p>
                <p className="text-white/60 text-sm">Total Donations</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>All Individual Donors</CardTitle>
            <CardDescription>
              Every donation makes a difference, no matter the size
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {individuals.slice(3).map((individual, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 bg-white/10">
                      <AvatarFallback>
                        {individual.name.split(' ')[0][0] + individual.name.split(' ')[1][0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-sm">{individual.name}</h4>
                    </div>
                  </div>
                  <p className="font-bold">${individual.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaderboardHelpers;
