
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Download, Link as LinkIcon, CheckCircle, HelpCircle } from 'lucide-react';

const WalletSetup = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Wallet Setup Guide</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Follow these steps to set up your wallet and start receiving NFT receipts for your donations.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>1. Choose a Wallet</CardTitle>
            <CardDescription>
              Select a wallet that supports the Solana blockchain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-6 flex flex-col items-center text-center">
                <img src="https://phantom.app/apple-touch-icon.png" alt="Phantom Wallet" className="w-12 h-12 mb-2 rounded-full" />
                <span className="font-medium">Phantom</span>
                <span className="text-xs text-white/60 mt-1">Popular and user-friendly</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-6 flex flex-col items-center text-center">
                <img src="https://solflare.com/logo512.png" alt="Solflare Wallet" className="w-12 h-12 mb-2 rounded-full" />
                <span className="font-medium">Solflare</span>
                <span className="text-xs text-white/60 mt-1">Full-featured wallet</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-6 flex flex-col items-center text-center">
                <Wallet className="w-12 h-12 mb-2" />
                <span className="font-medium">Other Wallets</span>
                <span className="text-xs text-white/60 mt-1">See more options</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>2. Install Your Wallet</CardTitle>
            <CardDescription>
              Download and install your selected wallet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto py-4 justify-start">
                <Download className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Browser Extension</div>
                  <div className="text-xs text-white/60">For Chrome, Firefox, or Edge</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto py-4 justify-start">
                <Download className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Mobile App</div>
                  <div className="text-xs text-white/60">For iOS or Android</div>
                </div>
              </Button>
            </div>
            
            <div className="bg-white/5 p-4 rounded-md flex items-start">
              <HelpCircle className="h-5 w-5 text-[#F2FF44] mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-white/80">
                Make sure to download wallet apps only from official sources like the Chrome Web Store, Apple App Store, or Google Play Store.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>3. Create a New Wallet</CardTitle>
            <CardDescription>
              Follow the wallet's setup instructions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-3">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#F2FF44] mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Create a password</p>
                  <p className="text-sm text-white/60">Secure your wallet with a strong password</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#F2FF44] mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Save your recovery phrase</p>
                  <p className="text-sm text-white/60">Write down and store your recovery phrase in a safe place</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#F2FF44] mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Confirm your recovery phrase</p>
                  <p className="text-sm text-white/60">Verify your recovery phrase when prompted</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#F2FF44]/10 border border-[#F2FF44]/20 p-4 rounded-md flex items-start">
              <HelpCircle className="h-5 w-5 text-[#F2FF44] mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-[#F2FF44]">Important Security Warning</p>
                <p className="text-white/80 mt-1">
                  Never share your recovery phrase or private keys with anyone. Anyone with access to these can control your wallet and funds.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>4. Connect Your Wallet</CardTitle>
            <CardDescription>
              Connect your wallet to receive NFT receipts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <Button className="bg-[#F2FF44] text-black hover:bg-[#E2EF34] text-lg px-8">
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet
              </Button>
              <p className="mt-4 text-sm text-white/60">
                Click the button above to connect your wallet to our platform
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/donate" className="text-[#F2FF44] text-sm flex items-center">
              <LinkIcon className="h-4 w-4 mr-1" />
              Return to Donation Page
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default WalletSetup;
