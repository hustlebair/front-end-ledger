
import { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import WhySection from '@/components/WhySection';
import IphoneExample from '@/components/IphoneExample';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import PricingSection from '@/components/PricingSection';
import FaqSection from '@/components/FaqSection';
import OverwhelmedSection from '@/components/OverwhelmedSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import KideraBlogGrid from '@/components/KideraBlogGrid';
import ScrollToTop from '@/components/ScrollToTop';

const Index = () => {
  // Add scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    return () => {
      animateElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <HeroSection />
      <OverwhelmedSection />
      <HowItWorksSection />
      {/* Featured On Section */}
      {/* <section className="hidden md:block py-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h3 className="text-xl font-light mb-4 text-center" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}>
            Featured On
          </h3>
          <div className="w-full">
            <div className="grid grid-cols-6 gap-12 justify-items-center items-center">
              <img src="/featured-on-logos/tiktok-logo.png" alt="TikTok" className="h-10 object-contain inline-block grayscale opacity-70" />
              <img src="/featured-on-logos/facebook-logo.png" alt="Facebook" className="h-8 object-contain inline-block grayscale opacity-70" />
              <img src="/featured-on-logos/pinterest-logo.png" alt="Pinterest" className="h-10 object-contain inline-block grayscale opacity-70" />
              <img src="/featured-on-logos/instagram-logo.png" alt="Instagram" className="h-10 object-contain inline-block grayscale opacity-70" />
              <img src="/featured-on-logos/reddit-logo.png" alt="Reddit" className="h-10 object-contain inline-block grayscale opacity-70" />
              <img src="/featured-on-logos/todays-parent.webp" alt="Today's Parent" className="h-10 object-contain inline-block grayscale opacity-70" />
            </div>
          </div>
        </div>
      </section> */}
      {/* Add keyframes for scroll-logos */}
      <style>{`
        @keyframes scroll-logos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <IphoneExample />
      <FeaturesSection />
      {/* <WhySection /> */}
      {/* <TestimonialsSection /> */}
      <PricingSection />
      <KideraBlogGrid showHeader={true} maxPosts={4} showFilters={false} />
      <FaqSection />
      <CtaSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
