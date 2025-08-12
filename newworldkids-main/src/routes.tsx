import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DonationPage = lazy(() => import('./pages/DonationPage'));
const AIWorkforce = lazy(() => import('./pages/AIWorkforce'));
const Animated3DAnimals = lazy(() => import('./pages/Animated3DAnimals'));
const BlockchainTracker = lazy(() => import('./pages/BlockchainTracker'));
const Blog = lazy(() => import('./pages/Blog'));
const ExclusivePerks = lazy(() => import('./pages/ExclusivePerks'));
const FirebaseSync = lazy(() => import('./pages/FirebaseSync'));
const ImpactProjects = lazy(() => import('./pages/ImpactProjects'));
const LeaderboardCompanies = lazy(() => import('./pages/LeaderboardCompanies'));
const LeaderboardHelpers = lazy(() => import('./pages/LeaderboardHelpers'));
const NFTReceipt = lazy(() => import('./pages/NFTReceipt'));
const SpecialNFTBadges = lazy(() => import('./pages/SpecialNFTBadges'));
const WalletSetup = lazy(() => import('./pages/WalletSetup'));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/donate" element={<DonationPage />} />
          <Route path="/ai-workforce" element={<AIWorkforce />} />
          <Route path="/animals" element={<Animated3DAnimals />} />
          <Route path="/blockchain" element={<BlockchainTracker />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/perks" element={<ExclusivePerks />} />
          <Route path="/sync" element={<FirebaseSync />} />
          <Route path="/impact" element={<ImpactProjects />} />
          <Route path="/leaderboard/companies" element={<LeaderboardCompanies />} />
          <Route path="/leaderboard/helpers" element={<LeaderboardHelpers />} />
          <Route path="/nft/receipt" element={<NFTReceipt />} />
          <Route path="/nft/badges" element={<SpecialNFTBadges />} />
          <Route path="/wallet" element={<WalletSetup />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
