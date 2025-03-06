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
      <Navigation />
      <div 
        className="flex min-h-screen flex-col items-center justify-center bg-custom-black bg-center bg-no-repeat bg-fixed" 
        style={{ 
          backgroundImage: 'url(/bg.png)', 
          backgroundSize: 'calc(240% - (100vw - 320px) * 0.22)'  // Responsive formula for background scaling
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Layout; 