
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Wallet } from "lucide-react";
import AnimalSelection from './AnimalSelection';

interface DonationFormProps {
  donationAmount: number;
  setDonationAmount: (amount: number) => void;
  handleDonationSubmit: (e: React.FormEvent) => void;
  selectedAnimal: string;
  setSelectedAnimal: (animal: string) => void;
}

const DonationForm = ({
  donationAmount,
  setDonationAmount,
  handleDonationSubmit,
  selectedAnimal,
  setSelectedAnimal
}: DonationFormProps) => {
  const { connected } = useWallet();

  return (
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

        <AnimalSelection 
          selectedAnimal={selectedAnimal} 
          setSelectedAnimal={setSelectedAnimal} 
        />

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
  );
};

export default DonationForm;
