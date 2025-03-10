import React from 'react';
import SEO from './seo';
import Navigation from './Navigation';

const Layout = ({ 
  children, 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogType, 
  twitterCard, 
  canonicalUrl 
}) => {
  return (
    <>
      <SEO 
        title={title}
        description={description}
        keywords={keywords}
        ogImage={ogImage}
        ogType={ogType}
        twitterCard={twitterCard}
        canonicalUrl={canonicalUrl}
      />
      
      {/* Lava Lamp Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Blob 1 - Pink */}
        <div className="absolute w-[50rem] h-[30rem] bg-pink-500/15 blur-[100px] rounded-full animate-move1" />
        {/* Blob 2 - Blue */}
        <div className="absolute w-[60rem] h-[35rem] bg-blue-500/15 blur-[120px] rounded-full animate-move2" />
        {/* Blob 3 - Purple */}
        <div className="absolute w-[55rem] h-[32rem] bg-purple-500/15 blur-[110px] rounded-full animate-move3" />
      </div>

      {/* Blurred Overlay */}
      <div className="fixed inset-0 backdrop-blur-[120px] bg-black/3 z-10" />

      <Navigation />
      
      <div className="flex min-h-screen flex-col items-center justify-center bg-black/10 z-20 relative">
        {children}
      </div>
    </>
  );
};

export default Layout; 