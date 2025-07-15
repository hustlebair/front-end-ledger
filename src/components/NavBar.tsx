
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
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-full">
        <a href="/" className="flex items-center">
          <img 
            src="/images/kidera_logo.png" 
            alt="Kidera Logo" 
            className="h-8 w-auto"
          />
        </a>
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="#features" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            How It Works
          </a>
          <a 
            href="#testimonials" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Testimonials
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
        <div className="flex items-center space-x-3">
          <a href="https://kidera.app/login" target="_blank" rel="noopener noreferrer">
            <Button 
              size="sm" 
              className="font-bold text-white shadow-lg border-0 transition-transform duration-200 hover:scale-105 text-sm px-4"
              style={{
                background: '#00afe4',
              }}
            >
              Log In
            </Button>
          </a>
          <div className="relative inline-flex">
            <div className="absolute -inset-0.5 rounded-lg bg-[linear-gradient(90deg,#fa2284_0%,#ff8b00_50%,#00afe4_100%)] opacity-75 blur transition-all duration-300 hover:opacity-100 hover:blur-sm md:hover:blur-md" />
            <a href="https://www.kidera.app" target="_blank" rel="noopener noreferrer">
              <Button 
                size="sm" 
                className="relative z-10 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 text-sm px-4 font-bold"
              >
                Start Free
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
