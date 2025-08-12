
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/useLanguage";
import useStore from './store';
import Layout from './components/Layout';
import AppRoutes from './routes';
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

import '@solana/wallet-adapter-react-ui/styles.css';

const queryClient = new QueryClient();

const App = () => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = clusterApiUrl(network);
  const wallets = [new PhantomWalletAdapter()];
  const { isDarkMode } = useStore();

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                <LanguageProvider>
                  <div className={isDarkMode ? 'dark' : ''}>
                    <Layout>
                      <AppRoutes />
                    </Layout>
                  </div>
                </LanguageProvider>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
