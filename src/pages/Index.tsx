
import { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import WhySection from '@/components/WhySection';
import IphoneExample from '@/components/IphoneExample';
import FeaturesSection from '@/components/FeaturesSection';
import ScreenshotsSection from '@/components/ScreenshotsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
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
      <WhySection />
      <IphoneExample />
      <FeaturesSection />
      <ScreenshotsSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
