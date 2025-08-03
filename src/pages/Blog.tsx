import React from 'react';
import { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import KideraBlogGrid from '@/components/KideraBlogGrid';

const Blog = () => {
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
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      {/* Hero Section for Blog */}
      <section className="pt-32 pb-8 bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">Parenting </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-500">
              Wisdom
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Expert advice, real stories, and practical tips to support you on your parenting journey. 
            From newborn care to toddler adventures, find the guidance you need.
          </p>
          
          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a 
              href="#tips-advice" 
              className="px-6 py-3 bg-white text-gray-700 rounded-full hover:bg-pink-50 hover:text-pink-600 transition-colors shadow-sm border border-gray-200"
            >
              💡 Tips & Advice
            </a>
            <a 
              href="#child-development" 
              className="px-6 py-3 bg-white text-gray-700 rounded-full hover:bg-pink-50 hover:text-pink-600 transition-colors shadow-sm border border-gray-200"
            >
              🌱 Child Development
            </a>
            <a 
              href="#family-activities" 
              className="px-6 py-3 bg-white text-gray-700 rounded-full hover:bg-pink-50 hover:text-pink-600 transition-colors shadow-sm border border-gray-200"
            >
              🎨 Family Activities
            </a>
            <a 
              href="#personal-stories" 
              className="px-6 py-3 bg-white text-gray-700 rounded-full hover:bg-pink-50 hover:text-pink-600 transition-colors shadow-sm border border-gray-200"
            >
              💝 Personal Stories
            </a>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <KideraBlogGrid showHeader={false} showFilters={true} />
      
      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-pink-100 via-orange-100 to-yellow-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-6">💌</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Never Miss a Parenting Tip
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Get our latest articles, expert advice, and parenting insights delivered straight to your inbox. 
            Join thousands of parents who rely on Kidera for guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-pink-300 focus:ring-pink-200 focus:outline-none"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-200">
              Subscribe
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            No spam, unsubscribe at any time. Read our{' '}
            <a href="/privacy-policy" className="text-pink-600 hover:text-pink-700">
              privacy policy
            </a>
            .
          </p>
        </div>
      </section>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Blog; 