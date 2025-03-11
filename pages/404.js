import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Custom404() {
  return (
    <Layout
      title="404 - Page Not Found | OPEN Community"
      description="The requested page does not exist. Return to the OPEN Community homepage."
      canonicalUrl="/404"
    >
      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 sm:px-8 md:px-20 py-8 text-center max-w-6xl mx-auto">
        <a href="/" className="block mb-6 sm:mb-10">
          <img src="/logo.png" alt="Logo" className="max-h-16 sm:max-h-20 transition-transform duration-300 hover:scale-105" />
        </a>
        
        <div className="w-full text-center mt-4 mb-12">
          <h1 className="open-font text-white text-4xl sm:text-7xl uppercase mb-6 tracking-wider relative">
            404
          </h1>
          
          <div className="p-4max-w-2xl mx-auto">
            <h2 className="open-font text-white text-2xl sm:text-3xl uppercase mb-6">Page Not Found</h2>
            
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="relative overflow-hidden inline-block group">
              <Link 
                href="/"
                className="bg-opngreen text-black px-8 py-3 rounded-md text-xl uppercase font-bold tracking-wider inline-block transition-transform duration-300 group-hover:scale-110 relative z-10"
              >
                Return Home
              </Link>
              <div className="absolute inset-0 bg-opnpurple rounded-md transform scale-0 group-hover:scale-100 transition-transform duration-300 z-0"></div>
            </div>
          </div>
        </div>
        
      </main>
    </Layout>
  );
} 