import Head from 'next/head'
import SEO from '../components/seo'; 

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
   }
]

const communityLinks = [
  {
    name: 'Token Info',
    url: '#',
    description: 'Coming soon',
    disabled: true
  },
  {
    name: 'Dashboard',
    url: '#',
    description: 'Coming soon',
    disabled: true
  },
  {
    name: 'Governance Overview',
    url: '#',
    description: 'Coming soon',
    disabled: true
  }
]

export default function Home() {
  return (
    <>
      <SEO title="OPEN Community - Engage in the Revolution" description="Join our vibrant community to revolutionize ticketing with blockchain. Get involved in web3 innovations that empower creators and fans." />
      <div className="flex min-h-screen flex-col items-center justify-center bg-custom-black bg-cover" style={{ backgroundImage: 'url(/bg.png)', backgroundPosition: 'center', backgroundSize: '160%', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}}>
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <img src="/logo.png" alt="Logo" className="mb-10 max-h-20" />
          <div className="mt-10">
            <h1 className='open-font text-white text-5xl uppercase mb-8'>
              Links
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-6 flex flex-col items-center justify-center border-2 border-white/40 transition-all duration-300 ease-in-out hover:border-white/60 bg-black/20 transition-all duration-300 ease-in-out hover:backdrop-blur-xl backdrop-blur-xl relative h-24 overflow-hidden group"
                >
                  <span className="open-font text-open uppercase text-xl font-bold text-white transition-transform duration-300 ease-in-out group-hover:scale-110 z-10">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Community Links Section */}
            <h1 className='open-font text-white text-5xl uppercase mb-8 mt-16'>
              Community Links
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
              {communityLinks.map((link, index) => (
                <div
                  key={index}
                  className="rounded-lg p-6 flex flex-col items-center justify-center border-2 border-white/40 backdrop-blur-md relative h-24 overflow-hidden"
                  style={{ background: 'rgba(0,0,0,0.3)' }}
                >
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
      </div>
    </>
  )
}
