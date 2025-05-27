
import { Calendar, FileImage, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const features = [
    {
      icon: Calendar,
      title: "Pick a date",
      description: "Tap a day on the calendar to add a new memory or revisit a special moment.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: FileImage,
      title: "Add a memory",
      description: "Write, upload a photo or video with just a few taps.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Sparkles,
      title: "Relive the magic",
      description: "AI summaries and face evolution visuals help you see growth and change.",
      color: "from-purple-500 to-fuchsia-500"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 mb-4">
            Journaling should feel effortless.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            We've designed Little Ledger to fit into your busy life as a parent, not add to your to-do list.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8 lg:gap-12 px-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="group relative p-10 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent"
              variants={item}
              whileHover={{ y: -5 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 rounded-2xl`} />
              <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
              <div className="mt-6 h-0.5 w-12 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
