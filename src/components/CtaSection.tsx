
import React from 'react';
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  return (
    <section className="py-20 relative">
      {/* Desktop Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed hidden lg:block"
        style={{ backgroundImage: 'url(/family.jpg)' }}
      />
      {/* Mobile Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:hidden"
        style={{ backgroundImage: 'url(/momsunmobile.jpg)' }}
      />
      {/* Desktop Overlay */}
      <div className="absolute inset-0 bg-black/40 hidden lg:block" />
      {/* Mobile Overlay - lighter for better text readability */}
      <div className="absolute inset-0 bg-white/70 lg:hidden" />
      <div className="container-narrow text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 lg:text-white">
          Start your child's story today.
        </h2>
        <p className="text-lg text-gray-700 lg:text-white/90 mb-8 max-w-xl mx-auto">
          Don't let another precious memory fade away. Begin your journal in just a minute.
        </p>
        <div className="relative inline-flex">
          <div className="absolute -inset-0.5 rounded-lg bg-white opacity-75 blur transition-all duration-300 hover:opacity-100 hover:blur-sm md:hover:blur-md" />
          <a href="https://kidera.app/signup" target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg" 
              className="relative z-10 bg-[#00afe4] text-white hover:bg-[#0098cc] transition-all duration-300 px-8 py-4 text-lg font-semibold"
            >
              Start Saving Memories
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
