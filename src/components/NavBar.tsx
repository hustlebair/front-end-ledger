
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
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blush-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold">LL</span>
          </div>
          <span className="font-semibold text-xl">Little Ledger</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
          <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
        </nav>
        <Button size="sm" variant="ghost" className="md:hidden">Menu</Button>
        <Button size="sm" className="hidden md:inline-flex">Start Free</Button>
      </div>
    </header>
  );
};

export default NavBar;
