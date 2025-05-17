
import { Calendar, FileImage, Magic } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Calendar,
      title: "Pick a date",
      description: "Tap a day on the calendar to add a new memory or revisit a special moment.",
    },
    {
      icon: FileImage,
      title: "Add a memory",
      description: "Write, upload a photo or video with just a few taps.",
    },
    {
      icon: Magic,
      title: "Relive the magic",
      description: "AI summaries and face evolution visuals help you see growth and change.",
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          Journaling should feel effortless.
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
          We've designed Little Ledger to fit into your busy life as a parent, not add to your to-do list.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="w-12 h-12 rounded-full bg-blush-100 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-blush-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
