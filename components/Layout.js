import React from 'react';
import SEO from './seo';
import Navigation from './Navigation';
import Head from 'next/head';

const Layout = ({ 
  children, 
  title, 
  description, 
  keywords: propKeywords, 
  ogImage, 
  ogType, 
  twitterCard, 
  canonicalUrl 
}) => {
  const siteTitle = 'OPEN Community Hub';
  const pageTitle = title ? `${title}` : siteTitle;
  const pageDescription = description || "Join the OPEN community and help us build a future where onchain ticketing puts power back in the hands of fans, artists, and organizers.";
  const defaultKeywords = "onchain ticketing, web3 ticketing, NFT tickets, blockchain tickets, OPN token, ticketing revolution, OPEN community";
  const keywords = propKeywords || defaultKeywords;
  const siteUrl = "https://community.onopen.xyz";
  const socialImageUrl = `${siteUrl}/social-card.png`; // Assuming you'll add a social-card.png to /public

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`${siteUrl}${canonicalUrl || ''}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}${canonicalUrl || ''}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={socialImageUrl} />
        <meta property="og:site_name" content={siteTitle} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${siteUrl}${canonicalUrl || ''}`} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={socialImageUrl} />
        <meta name="twitter:creator" content="@onopenxyz" />

      </Head>
      
      <SEO 
        title={title}
        description={description}
        keywords={keywords}
        ogImage={ogImage}
        ogType={ogType}
        twitterCard={twitterCard}
        canonicalUrl={canonicalUrl}
      />
      
      <div className="relative min-h-screen w-full bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-50vh] left-[-30vw] w-[80vw] h-[80vh] bg-gradient-to-tr from-purple-900 via-pink-500 to-red-500 rounded-full filter blur-3xl opacity-30 animate-move1"></div>
          <div className="absolute top-[30vh] left-[40vw] w-[60vw] h-[60vh] bg-gradient-to-br from-blue-800 via-teal-400 to-green-400 rounded-full filter blur-3xl opacity-30 animate-move2"></div>
          <div className="absolute bottom-[-40vh] left-[-40vw] w-[70vw] h-[70vh] bg-gradient-to-tr from-yellow-500 via-orange-600 to-red-700 rounded-full filter blur-3xl opacity-20 animate-move3"></div>
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </div>
      <footer className="relative z-10 w-full text-center py-12 px-4 text-zinc-400 text-sm">
        <p>A community-driven portal created by Brom.</p>
        <a 
          href="https://github.com/bromdigital/open-community-home-site"
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:text-white transition-colors"
        >
          Contribute on GitHub
        </a>
      </footer>

      <Navigation />
    </>
  );
};

export default Layout; 