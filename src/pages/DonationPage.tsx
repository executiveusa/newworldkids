import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Award, Gift, Star, Bird, Rabbit, Mouse, Wallet, ChevronRight } from "lucide-react";

import DonationProgress from '@/components/donation/DonationProgress';
import DonationTiers from '@/components/donation/DonationTiers';
import TopDonors from '@/components/donation/TopDonors';

const DonationPage = () => {
  const { connected } = useWallet();
  const [donationAmount, setDonationAmount] = useState<number>(10);
  const [currentAmount, setCurrentAmount] = useState<number>(37500);
  const [goalAmount, setGoalAmount] = useState<number>(250000);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [selectedAnimal, setSelectedAnimal] = useState<string>("bird");

  useEffect(() => {
    const percentage = (currentAmount / goalAmount) * 100;
    setProgressPercentage(Math.min(percentage, 100));
  }, [currentAmount, goalAmount]);

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTotal = currentAmount + donationAmount;
    setCurrentAmount(newTotal);
    
    console.log(`Processing donation of $${donationAmount}`);
  };

  const animalOptions = [
    { id: "bird", name: "Rainforest Bird", icon: <Bird className="h-6 w-6" /> },
    { id: "rabbit", name: "Savanna Rabbit", icon: <Rabbit className="h-6 w-6" /> },
    { id: "other", name: "Endangered Species", icon: <Mouse className="h-6 w-6" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Support Our Mission</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Your donations help us educate children about blockchain technology and fund conservation efforts for endangered species.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <Card className="glass-effect col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl">Make a Donation</CardTitle>
            <CardDescription>
              Choose an amount and receive an exclusive NFT receipt
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDonationSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Donation Amount
                  </label>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[10, 25, 50, 100].map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant={donationAmount === amount ? "default" : "outline"}
                        className={donationAmount === amount ? "bg-[#F2FF44] text-black" : ""}
                        onClick={() => setDonationAmount(amount)}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">$</span>
                    <Input
                      type="number"
                      min={1}
                      className="pl-8"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select NFT Animal Theme
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {animalOptions.map((animal) => (
                      <Button
                        key={animal.id}
                        type="button"
                        variant={selectedAnimal === animal.id ? "default" : "outline"}
                        className={`flex items-center justify-center gap-2 ${
                          selectedAnimal === animal.id ? "bg-[#F2FF44] text-black" : ""
                        }`}
                        onClick={() => setSelectedAnimal(animal.id)}
                      >
                        {animal.icon}
                        <span>{animal.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {!connected && (
                  <div className="bg-white/5 p-4 rounded-md">
                    <p className="text-sm text-white/80 mb-2">
                      Connect your wallet to receive your NFT donation receipt
                    </p>
                    <Link to="/wallet-setup">
                      <Button variant="outline" className="w-full">
                        <Wallet className="mr-2 h-4 w-4" />
                        Set Up Wallet
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full mt-6 bg-[#F2FF44] text-black hover:bg-[#E2EF34] text-lg"
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate ${donationAmount}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col text-sm text-white/60">
            <p>All donations are secured through blockchain technology and are tax-deductible.</p>
          </CardFooter>
        </Card>

        <div className="space-y-8">
          <DonationProgress 
            currentAmount={currentAmount} 
            goalAmount={goalAmount} 
            progressPercentage={progressPercentage} 
          />
          
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
        </div>
      </div>

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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DonationPage;
