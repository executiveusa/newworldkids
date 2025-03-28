
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { connected } = useWallet();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-white" : "text-white/80 hover:text-white";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">New World Kids</Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/dashboard" className={`${isActive('/dashboard')} transition-colors`}>
            Dashboard
          </Link>
          <Link to="/impact-projects" className={`${isActive('/impact-projects')} transition-colors`}>
            Impact Projects
          </Link>
          <Link to="/blockchain-tracker" className={`${isActive('/blockchain-tracker')} transition-colors`}>
            Blockchain Tracker
          </Link>
          <Link to="/ai-workforce" className={`${isActive('/ai-workforce')} transition-colors`}>
            AI Workforce
          </Link>
          <Link to="/agents" className={`${isActive('/agents')} transition-colors`}>
            AI Agents
          </Link>
          {connected ? (
            <WalletMultiButton className="bg-[#F2FF44] text-black hover:bg-[#E2EF34] px-4 py-2 rounded-md" />
          ) : (
            <Button className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]">
              Connect Wallet
              <LogIn className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
