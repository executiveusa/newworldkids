
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Download, ExternalLink, Check, Copy } from 'lucide-react';

const NFTReceipt = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Your NFT Receipt</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Thank you for your donation! Here's your unique NFT receipt as proof of your contribution.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card className="glass-effect overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative">
                  <img 
                    src="https://placehold.co/600x600/1a1a1a/F2FF44?text=Rainforest+Bird+NFT" 
                    alt="NFT Receipt" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
                    <h3 className="text-xl font-bold">Rainforest Bird #2453</h3>
                    <p className="text-sm text-white/80">Donation NFT Receipt</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>NFT Receipt Details</CardTitle>
                <CardDescription>
                  Transaction and donation information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-white/60">Donation Amount</p>
                  <p className="text-xl font-bold">$50.00</p>
                </div>
                
                <div>
                  <p className="text-sm text-white/60">Date</p>
                  <p>April 22, 2024</p>
                </div>
                
                <div>
                  <p className="text-sm text-white/60">Transaction Hash</p>
                  <div className="flex items-center">
                    <code className="bg-white/5 px-2 py-1 rounded text-xs truncate">
                      0x7d2b58e9632408...1a3b5e88
                    </code>
                    <Button size="icon" variant="ghost" className="h-8 w-8 ml-2">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-white/60">NFT Contract</p>
                  <div className="flex items-center">
                    <code className="bg-white/5 px-2 py-1 rounded text-xs truncate">
                      0xa7c83e5d38f702...7b2c49
                    </code>
                    <Button size="icon" variant="ghost" className="h-8 w-8 ml-2">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-white/60">Token ID</p>
                  <p>#2453</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Explorer
                </Button>
              </CardFooter>
            </Card>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Tax Receipt Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-[#F2FF44]">
                    <Check className="h-5 w-5 mr-2" />
                    <p className="font-medium">Tax Deductible Donation</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Your donation is tax-deductible. You can use this NFT as proof of your contribution for tax purposes.
                  </p>
                  <Button variant="outline" className="mt-2">
                    <Download className="h-4 w-4 mr-2" />
                    Download Tax Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTReceipt;
