import Link from 'next/link';

const Navigation = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto transition-transform duration-300 group-hover:scale-110" />
            <span className="text-2xl font-bold text-white tracking-wider group-hover:text-opngreen transition-colors duration-300">
              OPEN Community
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/" className="text-zinc-300 hover:text-white transition-colors duration-300 font-medium">
                Home
            </Link>
            <Link href="/proposals" className="text-zinc-300 hover:text-white transition-colors duration-300 font-medium">
                Proposals
            </Link>
            <Link href="/tokenomics" className="text-zinc-300 hover:text-white transition-colors duration-300 font-medium">
                Tokenomics
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation; 