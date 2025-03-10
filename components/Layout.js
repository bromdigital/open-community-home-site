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
      
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute w-[50rem] h-[30rem] bg-pink-500/30 blur-[100px] rounded-full animate-move1" />
        <div className="absolute w-[60rem] h-[35rem] bg-blue-500/30 blur-[120px] rounded-full animate-move2" />
        <div className="absolute w-[55rem] h-[32rem] bg-purple-500/30 blur-[110px] rounded-full animate-move3" />
      </div>

      <div className="fixed inset-0 backdrop-blur-[120px] z-10" />

      <Navigation />
      
      <div className="flex min-h-screen flex-col items-center justify-center bg-black/10 z-20 relative">
        {children}
      </div>
    </>
  );
};

export default Layout; 