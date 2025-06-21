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

          {/* <nav>
            <Link
              href="https://onopen.xyz/portal"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/10 backdrop-blur-lg border border-white/20 text-white px-6 py-2.5 rounded-full text-base font-bold tracking-wider inline-flex items-center gap-2 transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-purple-500/20"
            >
              Enter Portal
            </Link>
          </nav> */}
        </div>
      </div>
    </header>
  );
};

export default Navigation; 