import React from 'react';
import { motion } from 'framer-motion';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      title: "Capture Memories",
      description: "Start a dedicated space to capture your child's story through photos, videos, and written reflections. Every memory is beautifully organized in a visual calendar that grows with your child.",
      icon: "📝",
      gradient: "bg-gradient-to-br from-[#fa2284] to-[#e91e63]"
    },
    {
      number: "2", 
      title: "AI Organizes Everything",
      description: "Our intelligent system automatically organizes your memories by date, creates weekly summaries, and helps you find specific moments instantly.",
      icon: "🤖",
      gradient: "bg-gradient-to-br from-[#ff8b00] to-[#f57c00]"
    },
    {
      number: "3",
      title: "Reimagine Your Photos",
      description: "Animate your favorite moments using your own prompts. Turn everyday photos into something magical—make your child a superhero, a princess, or anything you can imagine. Kidera lets you bring photos to life in fun, creative ways.",
      icon: "💝",
      gradient: "bg-gradient-to-br from-[#00afe4] to-[#0288d1]"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 shadow-lg" style={{ backgroundColor: '#FFF8F2' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900">How </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa2284] via-[#ff8b00] to-[#00afe4]">It Works</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to preserve your child's precious moments forever.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Step Number */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${step.gradient} flex items-center justify-center shadow-lg`}>
                      <span className="text-white text-2xl md:text-3xl font-bold">{step.number}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to start preserving your child's story?
          </p>
          <div className="relative inline-flex">
            <div className="absolute -inset-0.5 rounded-lg bg-[linear-gradient(90deg,#fa2284_0%,#ff8b00_50%,#00afe4_100%)] opacity-75 blur transition-all duration-300 hover:opacity-100 hover:blur-sm md:hover:blur-md" />
            <a 
              href="https://kidera.app/signup" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button className="relative z-10 text-white hover:bg-[#0098cc] transition-all duration-300 text-base px-6 py-3 font-bold rounded-lg" style={{ background: '#00afe4' }}>
                Start your Journal
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 