
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Unlimited text entries",
        "30 photos per month",
        "5 videos per month",
        "Basic search"
      ],
      cta: "Start Free",
      highlight: false
    },
    {
      name: "Premium",
      price: "$7.99",
      period: "per month",
      description: "For the complete memory archive",
      features: [
        "Unlimited text entries",
        "Unlimited photos & videos",
        "Advanced AI summaries",
        "Face recognition",
        "Cloud backup",
        "Timeline visualization"
      ],
      cta: "Get Premium",
      highlight: true
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          Free to start. Upgrade when you're ready.
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
          Little Ledger grows with your family. Start free and add more storage as your memories multiply.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-xl p-8 ${
                plan.highlight 
                  ? 'bg-blush-50 border border-blush-200 shadow-soft' 
                  : 'bg-gray-50 border border-gray-100'
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-500">/{plan.period}</span>
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={plan.highlight ? "default" : "outline"} 
                className="w-full"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
