import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FaqSection = () => {
  const faqs = [
    {
      question: 'What exactly is Kidera, and how does it work?',
      answer: 'Kidera is a private digital journal designed for parents to capture and preserve their child’s most meaningful moments. You can write memories, upload photos or videos, and Kidera helps organize them into a beautiful timeline. Our AI also generates thoughtful summaries that help you reflect on how your child is growing over time.'
    },
    {
      question: 'Is this just for babies or can I use it as my child grows?',
      answer: 'Kidera is built to grow with your child. Whether you’re documenting first steps or their first big win at school, it’s designed to capture moments at every age and stage.'
    },
    {
      question: 'Do I need to download an app to use Kidera?',
      answer: 'Nope! Kidera works right in your browser on any device. You can access your memories from your phone, tablet, or computer. You can add the site to your home screen for easy access. App coming soon!'
    },
    {
      question: 'Can I upload photos and videos?',
      answer: 'Yes! You can add photos and videos alongside your journal entries to bring each memory to life. They’re securely stored and organized by date, so you can easily look back anytime.'
    },
    {
      question: 'How do the AI-powered summaries work?',
      answer: 'Our AI reads your entries and creates weekly summaries that highlight growth, milestones, and recurring themes. It’s like having a thoughtful assistant who helps you reflect on the journey of parenthood.'
    },
    {
      question: 'What if I forget to write every day?',
      answer: 'That’s totally okay. Kidera isn’t about perfection — it’s about capturing the moments that matter. Whether you write weekly, monthly, or just when something special happens, every entry adds to your child’s beautiful story. Plus, you can always go back and add more details later.'
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
