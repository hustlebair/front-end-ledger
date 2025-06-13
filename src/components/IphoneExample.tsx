import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Capture Moments Effortlessly',
    description: 'Quickly save precious memories with our intuitive interface. Never miss a moment with one-tap saving.',
    image: '/images/iphonecalendar.png' // You can replace this with your actual image path
  },
  {
    title: 'Organize with Ease',
    description: 'Categorize and tag your memories for easy retrieval. Create custom collections that grow with your family.',
    image: '/images/iphonecalendar.png'
  },
  {
    title: 'Relive the Journey',
    description: 'Beautifully presented memories that take you back in time. Watch your child\'s story unfold.',
    image: '/images/iphonecalendar.png'
  }
];

const IphoneExample = () => {
  return (
    <section className="py-12 md:py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className={`flex flex-row items-stretch gap-4 md:gap-8 mb-12 md:mb-24 last:mb-0 ${
              index % 2 === 1 ? 'flex-row-reverse md:flex-row-reverse' : ''
            }`}
          >
            {/* Text Block */}
            <motion.div 
              className="w-1/2 flex items-center md:justify-center"
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className={`w-full ${index % 2 === 0 ? 'pr-2 md:pr-0 md:pl-4' : 'pl-2 md:pl-0 md:pr-4'}`}>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight md:text-center">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed md:text-center">
                  {feature.description}
                </p>
              </div>
            </motion.div>

            {/* Image Container */}
            <motion.div 
              className="w-1/2 flex items-center md:justify-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-full max-w-[160px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px] xl:max-w-[280px]">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-auto block rounded-lg shadow-xl"
                    style={{
                      background: 'transparent',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IphoneExample;
