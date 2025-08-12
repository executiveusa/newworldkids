import { Helmet } from 'react-helmet-async';
import { Toaster } from './ui/toaster';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export default function Layout({
  children,
  title = 'New World Kids - Making a Difference Through Education and Conservation',
  description = 'Join New World Kids in our mission to educate and protect our planet through interactive learning, 3D animals, and blockchain technology.',
  keywords = 'education, conservation, blockchain, 3D animals, donations, children, learning',
  image = '/og-image.jpg',
}: LayoutProps) {
  const siteUrl = 'https://newworldkids.org'; // Replace with your actual domain

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}${image}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}${image}`} />

        {/* Accessibility */}
        <html lang="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={siteUrl} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow" role="main">
          {children}
        </main>
        <Footer />
      </div>
      
      <Toaster />
    </>
  );
}
