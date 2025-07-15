
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Face Evolution",
      description: "Watch your child grow through AI-generated face evolution videos that show their journey over time.",
      image: "/moving-baby.mp4",
      type: "video"
    },
    {
      id: 2,
      title: "Turn Everyday Moments Into Magic",
      description: "Swap backgrounds or transform your child into a Pixar-style character — perfect for memory books, gifts, or just pure joy.",
      image: "/ai-change.png",
      type: "image"
    },
    {
      id: 3,
      title: "Weekly AI Summaries",
      description: "Get beautiful weekly summaries of your child's growth and milestones, automatically generated from your memories.",
      image: "/weekly-summary.png",
      type: "image"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextFeature = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  // Mobile swipe functionality
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextFeature();
    }
    if (isRightSwipe) {
      prevFeature();
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900">Powered by </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa2284] via-[#ff8b00] to-[#00afe4]">AI Magic</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of memory keeping with intelligent features that bring your child's story to life.
          </p>
        </div>

        {/* Feature Carousel */}
        <div className="relative px-2 md:px-20">
          {/* Feature Content */}
          <div 
            className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col md:flex-row items-center"
              >
                {/* Image/Video Section */}
                <div className="w-full md:w-3/5 p-3 md:p-8">
                  <div className="relative">
                    {features[currentIndex].type === "video" ? (
                      <video
                        src={features[currentIndex].image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`w-full h-auto rounded-xl shadow-lg ${currentIndex === 2 ? 'scale-110' : ''}`}
                      />
                    ) : (
                      <img
                        src={features[currentIndex].image}
                        alt={features[currentIndex].title}
                        className={`w-full h-auto rounded-xl shadow-lg ${currentIndex === 2 ? 'scale-110' : ''}`}
                      />
                    )}
                    {/* Optional overlay or badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#fa2284] to-[#00afe4] text-white px-2 py-1 rounded-full text-xs font-semibold">
                      ⚡ AI Powered
                    </div>
                  </div>
                </div>

                {/* Text Section */}
                <div className="w-full md:w-1/2 p-3 md:p-8 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {features[currentIndex].title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {features[currentIndex].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows - positioned outside content */}
          <button
            onClick={prevFeature}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hidden md:block"
            aria-label="Previous feature"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <button
            onClick={nextFeature}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hidden md:block"
            aria-label="Next feature"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Feature indicators - moved below content */}
          <div className="flex justify-center space-x-2 mt-6">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-[#fa2284] to-[#00afe4]' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="text-center mt-8 md:hidden">
          <p className="text-sm text-gray-500">
            Swipe or use arrows to explore features
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
