
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed w-full z-50 transition-all duration-300 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)]" style={{height: '70px'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-8 flex items-center justify-between h-full">
        <a href="/" className="flex items-center flex-shrink-0">
          <img 
            src="/images/kidera_logo.png" 
            alt="Kidera Logo" 
            className="h-8 w-auto"
          />
        </a>
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="#how-it-works" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            How It Works
          </a>
          <a 
            href="#features" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Features
          </a>
          <a 
            href="#blog" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Blog
          </a>
          <a 
            href="#pricing" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Pricing
          </a>
        </nav>
        <div className="flex items-center space-x-3 flex-shrink-0">
          <a href="https://kidera.app/login" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
            Log In
          </a>
          <a href="https://www.kidera.app" target="_blank" rel="noopener noreferrer">
            <Button 
              size="sm" 
              className="text-white hover:bg-[#0098cc] transition-all duration-300 text-base sm:text-sm px-4 font-bold"
              style={{
                background: '#00afe4',
              }}
            >
              Start Now
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
