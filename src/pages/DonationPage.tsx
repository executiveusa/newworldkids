
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DonationProgress from '@/components/donation/DonationProgress';
import DonationForm from '@/components/donation/DonationForm';
import DonorBenefits from '@/components/donation/DonorBenefits';
import DonationTabs from '@/components/donation/DonationTabs';

const DonationPage = () => {
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
            <DonationForm 
              donationAmount={donationAmount}
              setDonationAmount={setDonationAmount}
              handleDonationSubmit={handleDonationSubmit}
              selectedAnimal={selectedAnimal}
              setSelectedAnimal={setSelectedAnimal}
            />
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
          
          <DonorBenefits />
        </div>
      </div>

      <DonationTabs />
    </div>
  );
};

export default DonationPage;
