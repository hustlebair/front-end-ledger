import { Button } from '@/components/ui/button';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative w-full pt-32 pb-16"
      style={{ backgroundColor: '#FFF8F2' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left: Text Content */}
        <motion.div
          className="w-full max-w-2xl mx-auto lg:mx-0 text-left px-4 md:px-8"
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {/* Badge - Moved above header */}
          <motion.div className="mb-6 flex justify-center lg:justify-start" variants={item}>
            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-[#00afe4]/10 text-[#00afe4] border border-[#00afe4]/20">
              🌟 Join thousands of families preserving memories
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-extrabold text-gray-900 leading-tight mb-4 lg:mb-5 text-[36px] md:text-5xl xl:text-[55px] text-center lg:text-left"
            style={{ lineHeight: 1.25 }}
            variants={item}
          >
            Better Than a Baby Book.<span className="block sm:inline"></span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa2284] via-[#ff8b00] to-[#00afe4]">Smarter Than Your Camera Roll.</span>
          </motion.h1>
          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-gray-700 mb-7 max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
            variants={item}
          >
            Our digital parenting journal transforms your chaotic photo storage into a heartfelt, organized story of your child's growth. 
          </motion.p>
          {/* View Monthly Plans Button */}
          <motion.div className="mb-7 flex justify-center lg:justify-start" variants={item}>
            <div className="relative inline-flex w-full sm:w-auto">
              <div className="absolute -inset-0.5 rounded-lg bg-[linear-gradient(90deg,#fa2284_0%,#ff8b00_50%,#00afe4_100%)] opacity-75 blur transition-all duration-300 hover:opacity-100 hover:blur-sm md:hover:blur-md" />
              <Button
                size="lg"
                className="relative z-10 text-white hover:bg-[#0098cc] transition-all duration-300 px-10 py-6 text-lg font-bold rounded-lg w-full sm:w-auto"
                style={{
                  background: '#00afe4',
                }}
                onClick={() => window.location.href = '#pricing'}
              >
                Start Your Journal
              </Button>
            </div>
          </motion.div>

          {/* Testimonial Card */}
          <motion.div
            className="bg-white rounded-xl shadow-md px-4 py-3 text-left border border-gray-100 w-full max-w-md mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex items-center mb-1">
              <span className="text-yellow-400 text-base mr-1">★★★★★</span>
            </div>
            <div className="text-gray-700 text-sm mb-0">
              "I love how easy it is to capture every milestone. Kidera keeps our memories safe!"
            </div>
            <div className="text-gray-500 text-xs mt-1">— Emily R., mom of 3</div>
          </motion.div>
        </motion.div>
        {/* Right: Video */}
        <div className="w-full flex flex-col items-center mt-10 lg:mt-0">
          <motion.div
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          >
            <img
              src="/canva-hero.png"
              alt="Hero illustration"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;