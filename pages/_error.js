import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

function Error({ statusCode }) {
  return (
    <Layout
      title={`Error ${statusCode || 'Unknown'} | OPEN Community`}
      description="An error occurred while loading this page. Please try again later."
      canonicalUrl="/error"
    >
      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 sm:px-8 md:px-20 py-8 text-center max-w-6xl mx-auto">
        <div className="w-full text-center mt-4 mb-12">
          <h1 className="open-font text-white text-4xl sm:text-7xl uppercase mb-6 tracking-wider relative animate-pulse">
            <span className="text-opnpurple">Error</span>
            {statusCode && (
              <span className="text-opngreen ml-4">{statusCode}</span>
            )}
          </h1>
          
          <div className="backdrop-blur-md p-8 rounded-lg border-2 border-white/20 bg-black/10 max-w-2xl mx-auto">
            <h2 className="open-font text-white text-2xl sm:text-3xl uppercase mb-6">
              {statusCode
                ? `A ${statusCode} error occurred`
                : 'An error occurred'}
            </h2>
            
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              {statusCode === 404
                ? "The page you're looking for doesn't exist or has been moved."
                : statusCode === 500
                ? "We're experiencing some trouble on our end. Please try again later."
                : "An unexpected error has occurred. Please try again later."}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="relative overflow-hidden inline-block group">
                <Link 
                  href="/"
                  className="bg-opngreen text-black px-8 py-3 rounded-md text-xl uppercase font-bold tracking-wider inline-block transition-transform duration-300 group-hover:scale-110 relative z-10"
                >
                  Return Home
                </Link>
                <div className="absolute inset-0 bg-opnpurple rounded-md transform scale-0 group-hover:scale-100 transition-transform duration-300 z-0"></div>
              </div>
              
              <button
                onClick={() => window.location.reload()}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-md text-xl uppercase font-bold tracking-wider inline-block transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
            <Link
              href="/"
              className="rounded-lg p-6 flex flex-col items-center justify-center border-2 border-white/40 transition-all duration-300 ease-in-out backdrop-blur-md bg-black/40 relative h-24 overflow-visible group"
            >
              <div className="absolute inset-0 rounded-lg transition-all duration-300 z-0" />
              <span className="open-font text-open uppercase text-lg font-bold text-white transition-transform duration-300 ease-in-out group-hover:scale-110 z-10">
                Home
              </span>
            </Link>
            
            <Link
              href="/proposals"
              className="rounded-lg p-6 flex flex-col items-center justify-center border-2 border-white/40 transition-all duration-300 ease-in-out backdrop-blur-md bg-black/40 relative h-24 overflow-visible group"
            >
              <div className="absolute inset-0 rounded-lg transition-all duration-300 z-0" />
              <span className="open-font text-open uppercase text-lg font-bold text-white transition-transform duration-300 ease-in-out group-hover:scale-110 z-10">
                DAO Proposals
              </span>
            </Link>
            
            <Link
              href="/token-allocation"
              className="rounded-lg p-6 flex flex-col items-center justify-center border-2 border-white/40 transition-all duration-300 ease-in-out backdrop-blur-md bg-black/40 relative h-24 overflow-visible group"
            >
              <div className="absolute inset-0 rounded-lg transition-all duration-300 z-0" />
              <span className="open-font text-open uppercase text-lg font-bold text-white transition-transform duration-300 ease-in-out group-hover:scale-110 z-10">
                Token Allocation
              </span>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 