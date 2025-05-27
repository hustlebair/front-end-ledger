import { Button } from '@/components/ui/button';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Text animation variants
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

  // Gradient blob animations
  const blobVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: [0.1, 0.15, 0.1],
      scale: [1, 1.05, 1],
      transition: {
        duration: 10 + i * 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <section ref={ref} className="relative pt-32 pb-40 overflow-hidden bg-white">
      <div className="container-narrow relative">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          <div className="overflow-hidden mb-6">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
              variants={item}
            >
              Because they won't be this little forever.
            </motion.h1>
          </div>
          
          <div className="overflow-hidden">
            <motion.p 
              className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              variants={item}
            >
              Little Ledger helps parents capture the moments they'll wish they remembered.
            </motion.p>
          </div>
          
          <motion.div 
            className="flex justify-center"
            variants={item}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="relative inline-block">
                {/* Animated gradient background */}
                <div className="absolute -inset-1 rounded-lg overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-75"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                    }}
                  />
                </div>
                
                {/* Button */}
                <Button 
                  size="lg" 
                  className="relative z-10 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 group"
                >
                  <span className="relative z-10 flex items-center">
                    Start Remembering More
                    <motion.span 
                      className="ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'loop'
                      }}
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.span 
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                </Button>
              </div>
            </motion.div>
          </motion.div>
          
          {/* App Preview */}
          <motion.div 
            className="mt-16 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <img 
              src="/images/differentages-ezgif.com-resize.gif" 
              alt="App preview showing memory timeline" 
              className="w-full h-auto rounded-lg shadow-lg"
              loading="eager"
            />
          </motion.div>
          
          <div className="mt-20">
            <p className="text-sm text-gray-500 mb-4 text-center">Trusted by families worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
              {/* Logos would go here */}
            </div>
          </div>
          
          <motion.div 
            className="mt-24 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gray-100 rounded-2xl opacity-50"></div>
              <div className="relative bg-white p-1 rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="w-full h-64 md:h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                  <span className="text-gray-300 text-lg">App Preview</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;