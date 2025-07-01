import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FaqSection = () => {
  const faqs = [
    {
      question: 'What age should I start sleep training my baby?',
      answer: 'Most babies are ready for sleep training between 4-6 months of age, when they have developed a more regular sleep-wake cycle and no longer need to feed during the night. However, every child is different, and some may be ready earlier or later.'
    },
    {
      question: 'Are your sleep methods gentle and safe?',
      answer: 'Yes, our sleep training methods are designed to be gentle and responsive to your baby\'s needs. We focus on creating healthy sleep habits while ensuring your baby feels secure and loved throughout the process.'
    },
    {
      question: 'How long does it typically take to see results?',
      answer: 'Most families see significant improvements within 3-7 days of consistent implementation. However, every child is different, and some may take up to 2-3 weeks to fully adjust to the new sleep routine.'
    },
    {
      question: 'What if my baby has special needs or medical conditions?',
      answer: 'We recommend consulting with your pediatrician before starting any sleep training program, especially if your baby has special needs or medical conditions. Our methods can often be adapted, but professional medical advice should always come first.'
    },
    {
      question: 'Do you offer refunds if the methods don\'t work?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you don\'t see improvements in your baby\'s sleep after following our program consistently for 30 days, we\'ll provide a full refund.'
    },
    {
      question: 'Can I use these methods for naps and nighttime sleep?',
      answer: 'Absolutely! Our methods are designed to work for both nap time and nighttime sleep. We provide specific guidance for establishing healthy sleep habits throughout the entire 24-hour period.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gray-900">Frequently Asked </span>
            <span className="text-purple-600">Questions</span>
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our sleep training methods and platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl overflow-hidden"
              initial={false}
              animate={{ 
                boxShadow: openIndex === index 
                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
                  : '0 10px 15px -3px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.08)'
              }}
              transition={{ duration: 0.2 }}
            >
              <button
                className={`w-full px-6 py-5 text-left flex items-center justify-between transition-colors ${
                  openIndex === index ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-${index}`}
              >
                <span className="text-lg font-bold text-gray-900">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-${index}`}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { 
                        opacity: 1, 
                        height: 'auto',
                        padding: '0 1.5rem 1.5rem'
                      },
                      collapsed: { 
                        opacity: 0, 
                        height: 0,
                        padding: 0,
                        margin: 0,
                        overflow: 'hidden'
                      }
                    }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
