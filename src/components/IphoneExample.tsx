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
            className={`flex flex-col items-center gap-12 md:gap-16 mb-20 md:mb-28 last:mb-0 md:flex-row ${
              index % 2 === 1 && 'md:flex-row-reverse'
            }`}
          >
            {/* Text Block */}
            <motion.div 
              className="w-full md:w-1/2 flex flex-col items-center"
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-full max-w-md px-4 text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  {feature.description}
                </p>
              </div>
            </motion.div>

            {/* Image Container */}
            <motion.div 
              className="w-full md:w-1/2 flex justify-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-[180px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px]">
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
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IphoneExample;
