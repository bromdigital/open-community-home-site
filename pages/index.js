import Head from 'next/head'
import SEO from '../components/seo'; 
import Layout from '../components/Layout';
import { FiExternalLink } from 'react-icons/fi';
import { useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const aboutLinks = [
  {
    name: 'Website',
    url: 'https://onopen.xyz/',
  },
  {
    name: 'Hub',
    url: 'https://hub.onopen.xyz/',
  },
  {
    name: 'Portal',
    url: 'https://onopen.xyz/portal',
  },
  {
    name: 'Mirror.xyz',
    url: 'https://mirror.xyz/openticketing.eth',
  },
]

const communityLinks = [
  { 
    name: 'Telegram', 
    url: 'https://t.me/openticketing',
  },
  { 
    name: 'Discord', 
    url: 'https://discord.gg/5zDK5FvP',
  },
  { 
    name: 'Twitter', 
    url: 'https://twitter.com/onopenxyz',
  },
  {
    name: 'Warpcast',
    url: 'https://warpcast.com/onopen',
  }
]

const engageLinks = [
  {
    name: 'Flooz Mini App',
    url: 'https://flooz.xyz/onopenxyz/booost',
  },
  { 
    name: 'DAO Proposals', 
    url: '/proposals',
  }
]

const inDevelopmentLinks = [
  {
    name: 'Token Allocation',
    url: '/token-allocation'
  },
  {
    name: 'Dashboard',
    url: '#'
  }
]

export default function Home() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
  };

  return (
    <Layout
      title="OPEN Community - Engage in the Revolution"
      description="Join our vibrant community to revolutionize ticketing with blockchain. Get involved in web3 innovations that empower creators and fans."
      canonicalUrl="/"
    >
      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 sm:px-8 md:px-20 py-8 text-center max-w-6xl mx-auto">
        <img src="/logo.png" alt="Logo" className="mb-6 sm:mb-10 max-h-16 sm:max-h-20" />
        
        {/* Hero Slider */}
        <div className="w-full mb-12 rounded-lg overflow-hidden border-2 border-white/20">
          <Slider {...sliderSettings} className="hero-slider">
            {/* Slide 1 */}
            <div className="relative">
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] bg-gradient-to-r from-black/40 to-black/40">
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: "url('/blank-slide.jpg')",
                    filter: "brightness(0.6)"
                  }}
                ></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10">
                  <h2 className="open-font text-white text-3xl md:text-5xl uppercase mb-4 tracking-wider max-w-2xl text-center">
                    Revolutionize <span className="text-opngreen">Ticketing</span> With Blockchain
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg text-center">
                    Join our mission to empower creators and fans through web3 innovations
                  </p>
                  <div className="relative overflow-hidden inline-block group">
                    <a 
                      href="https://onopen.xyz/portal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-opngreen text-black px-8 py-3 rounded-md text-xl uppercase font-bold tracking-wider inline-block transition-transform duration-300 group-hover:scale-110 relative z-10"
                    >
                      Get Started
                    </a>
                    <div className="absolute inset-0 bg-opnpurple rounded-md transform scale-0 group-hover:scale-100 transition-transform duration-300 z-0"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Slide 2 */}
            <div className="relative">
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] bg-gradient-to-r from-black/40 to-black/40">
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: "url('/blank-slide.jpg')",
                    filter: "brightness(0.6)"
                  }}
                ></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10">
                  <h2 className="open-font text-white text-3xl md:text-5xl uppercase mb-4 tracking-wider max-w-2xl text-center">
                    Join the <span className="text-opnpurple">DAO</span> Community
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg text-center">
                    Vote on proposals and help shape the future of decentralized ticketing
                  </p>
                  <div className="relative overflow-hidden inline-block group">
                    <a 
                      href="/proposals"
                      className="bg-opnpurple text-white px-8 py-3 rounded-md text-xl uppercase font-bold tracking-wider inline-block transition-transform duration-300 group-hover:scale-110 relative z-10"
                    >
                      View Proposals
                    </a>
                    <div className="absolute inset-0 bg-opngreen rounded-md transform scale-0 group-hover:scale-100 transition-transform duration-300 z-0"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Slide 3 */}
            <div className="relative">
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] bg-gradient-to-r from-black/40 to-black/40">
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: "url('/blank-slide.jpg')",
                    filter: "brightness(0.6)"
                  }}
                ></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10">
                  <h2 className="open-font text-white text-3xl md:text-5xl uppercase mb-4 tracking-wider max-w-2xl text-center">
                    Explore <span className="text-open">Token</span> Economics
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg text-center">
                    Discover how our token allocation distributes value across the ecosystem
                  </p>
                  <div className="relative overflow-hidden inline-block group">
                    <a 
                      href="/token-allocation"
                      className="bg-white text-black px-8 py-3 rounded-md text-xl uppercase font-bold tracking-wider inline-block transition-transform duration-300 group-hover:scale-110 relative z-10"
                    >
                      View Allocation
                    </a>
                    <div className="absolute inset-0 bg-open rounded-md transform scale-0 group-hover:scale-100 transition-transform duration-300 z-0"></div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
        
        <div className="w-full mt-6 sm:mt-10">
          {/* About OPEN Links */}
          <h1 className='open-font text-white text-3xl sm:text-5xl uppercase mb-4 sm:mb-8'>
            About OPEN
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {aboutLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target={link.url.startsWith('/') ? undefined : "_blank"}
                rel={link.url.startsWith('/') ? undefined : "noopener noreferrer"}
                className="rounded-lg p-6 flex flex-col items-center justify-center border-2 border-white/40 transition-all duration-300 ease-in-out backdrop-blur-md bg-black/40 relative h-24 overflow-visible group"
              >
                <div className="absolute inset-0 rounded-lg transition-all duration-300 z-0" />
                <span className="open-font text-open uppercase text-xl font-bold text-white transition-transform duration-300 ease-in-out group-hover:scale-110 z-10">
                  {link.name}
                </span>
                {!link.url.startsWith('/') && (
                  <FiExternalLink 
                    className="absolute bottom-2 right-2 text-white/50 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}
              </a>
            ))}
          </div>

          {/* Community Links */}
          <h1 className='open-font text-white text-3xl sm:text-5xl uppercase mb-4 sm:mb-8 mt-10'>
            Join the Community
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {communityLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target={link.url.startsWith('/') ? undefined : "_blank"}
                rel={link.url.startsWith('/') ? undefined : "noopener noreferrer"}
                className="rounded-lg p-6 flex flex-col items-center justify-center border-2 border-white/40 transition-all duration-300 ease-in-out backdrop-blur-md bg-black/40 relative h-24 overflow-visible group"
              >
                <div className="absolute inset-0 rounded-lg transition-all duration-300 z-0" />
                <span className="open-font text-open uppercase text-xl font-bold text-white transition-transform duration-300 ease-in-out group-hover:scale-110 z-10">
                  {link.name}
                </span>
                {!link.url.startsWith('/') && (
                  <FiExternalLink 
                    className="absolute bottom-2 right-2 text-white/50 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}
              </a>
            ))}
          </div>

          {/* Engage Links */}
          <h1 className='open-font text-white text-3xl sm:text-5xl uppercase mb-4 sm:mb-8 mt-10'>
            Engage & Support
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {engageLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target={link.url.startsWith('/') ? undefined : "_blank"}
                rel={link.url.startsWith('/') ? undefined : "noopener noreferrer"}
                className="rounded-lg p-6 flex flex-col items-center justify-center border-2 border-white/40 transition-all duration-300 ease-in-out backdrop-blur-md bg-black/40 relative h-24 overflow-visible group"
              >
                <div className="absolute inset-0 rounded-lg transition-all duration-300 z-0" />
                <span className="open-font text-open uppercase text-xl font-bold text-white transition-transform duration-300 ease-in-out group-hover:scale-110 z-10">
                  {link.name}
                </span>
                {!link.url.startsWith('/') && (
                  <FiExternalLink 
                    className="absolute bottom-2 right-2 text-white/50 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}
              </a>
            ))}
          </div>

          {/* In Development Section */}
          <h1 className='open-font text-white text-3xl sm:text-5xl uppercase mb-4 sm:mb-8 mt-10'>
            In Development
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
            {inDevelopmentLinks.map((link, index) => (
              link.url !== '#' ? (
                <a
                  key={index}
                  href={link.url}
                  target={link.url.startsWith('/') ? undefined : "_blank"}
                  rel={link.url.startsWith('/') ? undefined : "noopener noreferrer"}
                  className="rounded-lg p-6 flex flex-col items-center justify-center border-2 border-white/40 transition-all duration-300 ease-in-out backdrop-blur-md bg-black/40 relative h-24 overflow-visible group"
                >
                  <div className="absolute inset-0 rounded-lg transition-all duration-300 z-0" />
                  <span className="open-font text-open uppercase text-xl font-bold text-white transition-transform duration-300 ease-in-out group-hover:scale-110 z-10">
                    {link.name}
                  </span>
                  {!link.url.startsWith('/') && (
                    <FiExternalLink 
                      className="absolute bottom-2 right-2 text-white/50 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  )}
                </a>
              ) : (
                <div
                  key={index}
                  className="rounded-lg p-6 flex flex-col items-center justify-center border-2 border-white/40 backdrop-blur-md relative h-24 overflow-visible group"
                >
                  <div className="absolute inset-0 rounded-lg backdrop-hue-rotate-0 transition-all duration-300 z-0" />
                  <div className="flex flex-col items-center z-10">
                    <span className="open-font text-open uppercase text-xl font-bold text-white/70">
                      {link.name}
                    </span>
                    <span className="text-white/50 text-xs mt-1 uppercase tracking-wide">Coming Soon</span>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}
