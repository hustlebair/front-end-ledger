
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
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-sm backdrop-blur-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container-narrow flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img 
            src="/images/kidera_logo.png" 
            alt="Kidera Logo" 
            className="h-8 w-auto"
          />
        </a>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
          <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
        </nav>
        <Button size="sm" variant="ghost" className="md:hidden">Menu</Button>
        <div className="relative hidden md:inline-flex group">
          <div className="absolute -inset-0.5 rounded-lg bg-[linear-gradient(90deg,#fa2284_0%,#ff8b00_50%,#00afe4_100%)] opacity-75 blur transition-all duration-300 group-hover:opacity-100 group-hover:blur-md" />
          <a href="https://www.littleledger.co" target="_blank" rel="noopener noreferrer">
            <Button 
              size="sm" 
              className="relative z-10 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300"
            >
              Start Free
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
