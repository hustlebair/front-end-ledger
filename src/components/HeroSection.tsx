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
    <section ref={ref} className="relative pt-36 pb-12 bg-white">
      <div className="container-narrow relative">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          <div className="overflow-hidden mb-8">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              variants={item}
            >
              Because they won't be this little forever.
            </motion.h1>
          </div>
          
          <div className="overflow-hidden mb-12">
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
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
              <div className="relative inline-block group">
                {/* Glow effect */}
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-75 blur transition-all duration-300 group-hover:opacity-100 group-hover:blur-md" />
                
                {/* Button */}
                <a href="https://www.littleledger.co" target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="lg" 
                    className="relative z-10 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300"
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
                </a>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-24 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative">
              <img 
                src="/images/iphonecalendar.png" 
                alt="Little Ledger App Preview" 
                className="mx-auto h-80 md:h-[32rem] object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;