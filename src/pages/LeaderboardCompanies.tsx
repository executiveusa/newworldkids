
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Medal, Trophy, Award } from 'lucide-react';

const LeaderboardCompanies = () => {
  const companies = [
    { name: "EcoTech Solutions", amount: 25000, logo: "/companies/ecotech.png" },
    { name: "Green Future Fund", amount: 15000, logo: "/companies/greenfuture.png" },
    { name: "Blockchain Education Co.", amount: 10000, logo: "/companies/blockchainedu.png" },
    { name: "Digital Learning Initiative", amount: 7500, logo: "/companies/digital.png" },
    { name: "Future Tech Foundation", amount: 6000, logo: "/companies/futuretech.png" },
    { name: "Web3 for Kids", amount: 5500, logo: "/companies/web3kids.png" },
    { name: "Innovation Partners", amount: 4500, logo: "/companies/innovation.png" },
    { name: "Tech For Good", amount: 3500, logo: "/companies/techforgood.png" },
    { name: "Global Education Fund", amount: 2800, logo: "/companies/globaledu.png" },
    { name: "Sustainable Future Corp", amount: 2500, logo: "/companies/sustainable.png" },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Corporate Donors Leaderboard</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Celebrating companies making a significant impact through their generous donations.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="glass-effect mb-10">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-6 w-6 text-[#F2FF44]" />
              Top Corporate Supporters
            </CardTitle>
            <CardDescription>
              Companies leading the way in supporting our mission
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {companies.slice(0, 3).map((company, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                  {index === 0 && <Medal className="h-6 w-6 text-[#F2FF44]" />}
                  {index === 1 && <Medal className="h-6 w-6 text-[#C0C0C0]" />}
                  {index === 2 && <Medal className="h-6 w-6 text-[#CD7F32]" />}
                  
                  <Avatar className="h-14 w-14 bg-white/10">
                    <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg">{company.name}</h3>
                    <p className="text-white/60">Corporate Donor</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold">${company.amount.toLocaleString()}</p>
                    <p className="text-white/60 text-xs">Total Donations</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>All Corporate Donors</CardTitle>
            <CardDescription>
              Companies of all sizes supporting our educational initiatives
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {companies.slice(3).map((company, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-white/10">
                      <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{company.name}</h4>
                    </div>
                  </div>
                  <p className="font-bold">${company.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaderboardCompanies;
