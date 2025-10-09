
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { LanguageProvider } from "@/hooks/useLanguage";
import { queryClient } from "@/services/client";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ImpactProjects from "./pages/ImpactProjects";
import BlockchainTracker from "./pages/BlockchainTracker";
import AIWorkforce from "./pages/AIWorkforce";
import DonationPage from "./pages/DonationPage";
import WalletSetup from "./pages/WalletSetup";
import NFTReceipt from "./pages/NFTReceipt";
import LeaderboardCompanies from "./pages/LeaderboardCompanies";
import LeaderboardHelpers from "./pages/LeaderboardHelpers";
import SpecialNFTBadges from "./pages/SpecialNFTBadges";
import ExclusivePerks from "./pages/ExclusivePerks";
import Animated3DAnimals from "./pages/Animated3DAnimals";
import Agents from "./pages/Agents";
import Blog from "./pages/Blog";
import Food from "./pages/blog/Food";
import Water from "./pages/blog/Water";
import Energy from "./pages/blog/Energy";
import Shelter from "./pages/blog/Shelter";
import TopicPage from "./pages/blog/[topic]/index";
import BlogPostDetail from "./pages/blog/[topic]/[slug]";
import FirebaseSync from "./pages/FirebaseSync";
import Footer from "./components/Footer";
import ChatDock from "./components/chatbot/ChatDock";
import ScrollToTopButton from "./components/ScrollToTopButton";

import '@solana/wallet-adapter-react-ui/styles.css';

const App = () => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = clusterApiUrl(network);
  const wallets = [new PhantomWalletAdapter()];

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <LanguageProvider>
                <BrowserRouter>
                  <div className="min-h-screen flex flex-col bg-background">
                    <Navbar />
                    <main className="flex-grow pt-20">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/impact-projects" element={<ImpactProjects />} />
                        <Route path="/blockchain-tracker" element={<BlockchainTracker />} />
                        <Route path="/ai-workforce" element={<AIWorkforce />} />
                        <Route path="/donate" element={<DonationPage />} />
                        <Route path="/wallet-setup" element={<WalletSetup />} />
                        <Route path="/nft-receipt" element={<NFTReceipt />} />
                        <Route path="/leaderboard-companies" element={<LeaderboardCompanies />} />
                        <Route path="/leaderboard-helpers" element={<LeaderboardHelpers />} />
                        <Route path="/special-nft-badges" element={<SpecialNFTBadges />} />
                        <Route path="/exclusive-perks" element={<ExclusivePerks />} />
                        <Route path="/animated-3d-animals" element={<Animated3DAnimals />} />
                        <Route path="/agents" element={<Agents />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/food" element={<Food />} />
                        <Route path="/blog/water" element={<Water />} />
                        <Route path="/blog/energy" element={<Energy />} />
                        <Route path="/blog/shelter" element={<Shelter />} />
                        <Route path="/blog/:topic" element={<TopicPage />} />
                        <Route path="/blog/:topic/:slug" element={<BlogPostDetail />} />
                        <Route path="/firebase-sync" element={<FirebaseSync />} />
                      </Routes>
                    </main>
                    <Footer />
                    <ChatDock />
                    <ScrollToTopButton />
                  </div>
                </BrowserRouter>
              </LanguageProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
