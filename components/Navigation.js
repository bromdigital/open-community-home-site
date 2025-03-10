import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBars } from 'react-icons/fa';

// Routes for navigation
const routes = [
  { name: 'Home', path: '/' },
  { name: 'Proposals', path: '/proposals' },
  // Add more routes as needed
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  // Close menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
  // Close menu when clicking outside
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling when menu is closed
    }
    
    return () => {
      document.body.style.overflow = 'auto'; // Ensure scrolling is enabled when component unmounts
    };
  }, [isOpen]);
  
  return (
    <>
      {/* Hamburger Button - Hidden when modal is open */}
      <button
        className={`fixed right-8 bottom-8 z-50 text-black text-2xl p-4 bg-opngreen hover:bg-opnpurple rounded-md transition-all duration-300 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
        onClick={() => setIsOpen(true)}
      >
        <FaBars />
      </button>
      
      {/* Navigation Modal Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-90 backdrop-blur-lg z-40 flex items-center justify-center transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="h-full w-full flex flex-col items-center justify-center">
            
            <nav className="flex flex-col items-center gap-10 p-8">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`text-4xl md:text-5xl open-font uppercase font-bold tracking-wider transition-all duration-300 ${
                    router.pathname === route.path
                      ? 'text-white scale-110'
                      : 'text-white/70 hover:text-white hover:scale-110'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {route.name}
                </Link>
              ))}
            </nav>
            
            <div className="absolute bottom-8 left-0 w-full flex justify-center">
              <img src="/logo.png" alt="Logo" className="max-h-10" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation; 