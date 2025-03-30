import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const { connected } = useWallet();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path ? "text-white" : "text-white/80 hover:text-white";
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="shimmer-effect">
          <span className="text-2xl font-black text-white font-archivo brand-gradient">New World Kids</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/dashboard" className={`${isActive('/dashboard')} transition-colors font-archivo`}>
            Dashboard
          </Link>
          <Link to="/impact-projects" className={`${isActive('/impact-projects')} transition-colors font-archivo`}>
            Impact Projects
          </Link>
          <Link to="/blockchain-tracker" className={`${isActive('/blockchain-tracker')} transition-colors font-archivo`}>
            Blockchain Tracker
          </Link>
          <Link to="/ai-workforce" className={`${isActive('/ai-workforce')} transition-colors font-archivo`}>
            AI Workforce
          </Link>
          <Link to="/agents" className={`${isActive('/agents')} transition-colors font-archivo`}>
            AI Agents
          </Link>
          <Link to="/blog" className={`${isActive('/blog')} transition-colors font-archivo`}>
            Blog
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

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-16 p-4 bg-background/95 backdrop-blur-lg z-50 border-t border-white/10">
            <div className="flex flex-col space-y-4 py-4">
              <Link to="/dashboard" 
                className={`${isActive('/dashboard')} px-4 py-2 font-archivo`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link to="/impact-projects" 
                className={`${isActive('/impact-projects')} px-4 py-2 font-archivo`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Impact Projects
              </Link>
              <Link to="/blockchain-tracker" 
                className={`${isActive('/blockchain-tracker')} px-4 py-2 font-archivo`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blockchain Tracker
              </Link>
              <Link to="/ai-workforce" 
                className={`${isActive('/ai-workforce')} px-4 py-2 font-archivo`}
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Workforce
              </Link>
              <Link to="/agents" 
                className={`${isActive('/agents')} px-4 py-2 font-archivo`}
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Agents
              </Link>
              <Link to="/blog" 
                className={`${isActive('/blog')} px-4 py-2 font-archivo`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              {connected ? (
                <div className="px-4 py-2">
                  <WalletMultiButton className="bg-[#F2FF44] text-black hover:bg-[#E2EF34] px-4 py-2 rounded-md w-full" />
                </div>
              ) : (
                <Button className="bg-[#F2FF44] text-black hover:bg-[#E2EF34] mx-4">
                  Connect Wallet
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
