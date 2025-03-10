import Head from 'next/head'
import SEO from '../components/seo'; 
import Layout from '../components/Layout';
import { FiExternalLink } from 'react-icons/fi';

const links = [
  {
    name: 'Website',
    url: 'https://onopen.xyz/',
  },
  {
    name: 'Hub',
    url: 'https://hub.onopen.xyz/',
  },
  {
    name: 'Flooz Mini App',
    url: 'https://flooz.xyz/onopenxyz/booost',
  },
  {
    name: 'Portal',
    url: 'https://onopen.xyz/portal',
  },
  {
    name: 'Warpcast',
    url: 'https://warpcast.com/onopen',
  },
  {
    name: 'Mirror.xyz',
    url: 'https://mirror.xyz/openticketing.eth',

  },
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
    name: 'Proposals', 
    url: '/proposals',
  }
]

const communityLinks = [
  {
    name: 'Token Info',
    url: '#'
  },
  {
    name: 'Dashboard',
    url: '#'
  }
]

export default function Home() {
  return (
    <Layout
      title="OPEN Community - Engage in the Revolution"
      description="Join our vibrant community to revolutionize ticketing with blockchain. Get involved in web3 innovations that empower creators and fans."
      canonicalUrl="/"
    >
      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 sm:px-8 md:px-20 py-8 text-center max-w-6xl mx-auto">
        <img src="/logo.png" alt="Logo" className="mb-6 sm:mb-10 max-h-16 sm:max-h-20" />
        <div className="w-full mt-6 sm:mt-10">
          <h1 className='open-font text-white text-3xl sm:text-5xl uppercase mb-4 sm:mb-8'>
            Links
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {links.map((link, index) => (
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

          {/* Community Links Section */}
          <h1 className='open-font text-white text-3xl sm:text-5xl uppercase mb-4 sm:mb-8'>
            In Development
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
            {communityLinks.map((link, index) => (
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
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}
