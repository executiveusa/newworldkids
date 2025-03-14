
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Medal, Building, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopDonors = () => {
  const corporateDonors = [
    { name: "EcoTech Solutions", amount: 25000, logo: "/companies/ecotech.png" },
    { name: "Green Future Fund", amount: 15000, logo: "/companies/greenfuture.png" },
    { name: "Blockchain Education Co.", amount: 10000, logo: "/companies/blockchainedu.png" }
  ];

  const individualDonors = [
    { name: "Sarah Johnson", amount: 5000, avatar: "/avatars/sarah.png" },
    { name: "Michael Chen", amount: 3500, avatar: "/avatars/michael.png" },
    { name: "Aisha Williams", amount: 2000, avatar: "/avatars/aisha.png" }
  ];

  return (
    <div className="space-y-8">
      <Card className="glass-effect">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5 text-[#F2FF44]" />
                Top Corporate Donors
              </CardTitle>
              <CardDescription>Companies supporting our mission</CardDescription>
            </div>
            <Link to="/leaderboard-companies">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {corporateDonors.map((donor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {index === 0 && <Medal className="h-5 w-5 text-[#F2FF44]" />}
                  <Avatar className="h-10 w-10 bg-white/10">
                    <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{donor.name}</p>
                  </div>
                </div>
                <p className="font-bold">${donor.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-[#F2FF44]" />
                Top Individual Donors
              </CardTitle>
              <CardDescription>People making a difference</CardDescription>
            </div>
            <Link to="/leaderboard-helpers">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {individualDonors.map((donor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {index === 0 && <Medal className="h-5 w-5 text-[#F2FF44]" />}
                  <Avatar className="h-10 w-10 bg-white/10">
                    <AvatarFallback>{donor.name.split(' ')[0][0] + donor.name.split(' ')[1][0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{donor.name}</p>
                  </div>
                </div>
                <p className="font-bold">${donor.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopDonors;
