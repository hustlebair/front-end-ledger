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
      className="relative w-full pt-32 pb-16 bg-gradient-to-br from-[#fff6fa] via-[#fff8f2] to-[#f2faff]"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 gap-8 lg:gap-12">
        {/* Left: Text Content */}
        <motion.div
          className="w-full max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {/* Badge */}
          <motion.div className="mb-8 flex justify-center lg:justify-start" variants={item}>
            <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-[#00afe4]/10 text-[#00afe4] border border-[#00afe4]/20">
              🌟 Join thousands of families preserving memories
            </span>
          </motion.div>
          {/* Headline */}
          <motion.h1
            className="font-extrabold text-gray-900 leading-tight mb-4 lg:mb-5 text-[40px] md:text-5xl xl:text-[55px]"
            style={{ lineHeight: 1.25 }}
            variants={item}
          >
            Your Child's Story,<span className="block sm:inline"></span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa2284] via-[#ff8b00] to-[#00afe4]">Beautifully Preserved</span>
          </motion.h1>
          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-gray-700 mb-7 max-w-lg mx-auto lg:mx-0"
            style={{ lineHeight: 1.7 }}
            variants={item}
          >
            Join parents who <b>never miss a milestone</b>. Kidera makes it <b>effortless</b> to <b>save</b>, <b>organize</b>, and <b>relive</b> your family’s most precious moments.
          </motion.p>
          {/* Callout Box */}
          <motion.div
            className="mb-7 p-4 rounded-lg border border-[#fa2284]/30 bg-[#fa2284]/5 text-base font-medium text-gray-800 max-w-xl mx-auto lg:mx-0"
            style={{ whiteSpace: 'normal', overflowX: 'visible' }}
            variants={item}
          >
            Unlock lifetime access for a one-time price – <span className="text-[#fa2284] font-semibold">for a short time only!</span>
          </motion.div>
          {/* Inline Checklist */}
          <motion.div className="flex flex-col items-start justify-start gap-y-2 mb-7 text-base font-medium" variants={item}>
            <span className="flex items-center text-gray-700">
              <Check className="w-5 h-5 text-[#fa2284] mr-1.5" /> Advanced Digital Scrapbook
            </span>
            <span className="flex items-center text-gray-700">
              <Check className="w-5 h-5 text-[#ff8b00] mr-1.5" /> AI-generated timelines
            </span>
            <span className="flex items-center text-gray-700">
              <Check className="w-5 h-5 text-[#00afe4] mr-1.5" /> Private and Secure
            </span>
          </motion.div>
          {/* CTAs */}
          <motion.div className="flex flex-col sm:flex-row gap-4 md:gap-3 justify-center lg:justify-start mb-7" variants={item}>
            <Button
              size="lg"
              className="font-bold text-white shadow-lg border-0 px-7 py-3 text-base transition-transform duration-200 hover:scale-105"
              style={{
                background: '#00afe4',
              }}
              onClick={() => window.location.href = '#pricing'}
            >
              Get Milestone Plan
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-bold border-2 border-[#fa2284] text-[#fa2284] bg-white hover:bg-[#fa2284]/10 px-7 py-3 text-base"
              onClick={() => window.location.href = '#demo'}
            >
              Watch Demo
            </Button>
          </motion.div>
          {/* Testimonial Card */}
          <motion.div
            className="bg-white rounded-xl shadow-md px-4 py-3 text-left border border-gray-100 w-full max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex items-center mb-1">
              <span className="text-yellow-400 text-base mr-1">★★★★★</span>
            </div>
            <div className="text-gray-700 text-sm mb-0">
              “I love how easy it is to capture every milestone. Kidera keeps our memories safe!”
            </div>
            <div className="text-gray-500 text-xs mt-1">— Emily R., mom of 3</div>
          </motion.div>
        </motion.div>
        {/* Right: Illustration */}
        <div className="w-full flex flex-col items-center mt-10 lg:mt-0">
          <motion.div
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          >
            <video
              src="/jittertrans.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;