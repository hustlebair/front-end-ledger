
import React from 'react';
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  return (
    <section className="py-20 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: 'url(/family.jpg)' }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="container-narrow text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Start your child's story today.
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
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
