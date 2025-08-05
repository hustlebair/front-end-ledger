import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Legacy Plan',
      monthlyPrice: '$6.99',
      yearlyPrice: '$4.99',
      yearlyBilled: '$59.88',
      monthlyPeriod: '/month',
      yearlyPeriod: '/month',
      description: 'Ideal for capturing every precious moment',
      features: [
        'Unlimited Text Entries',
        '20GB Media Storage (photos & videos)',
        'Premium AI Photo Tools (credits required)',
        '1,000 Free Credits',
        'Full AskKidera Access',
        'Weekly AI Summaries',
        'Face Cropping Software',
        'Priority Support',
        'Data Export',
      ],
      cta: 'Get Started',
      recommended: true,
      isDark: true,
      hasToggle: true,
    },
    {
      name: 'Free Plan',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started with essential features',
      features: [
        'Unlimited Text Entries',
        '200MB Media Storage (photos & videos)',
        'Premium AI Photo Tools (credits required)',
        'Limited AskKidera Access',
        'Weekly AI Summaries',
      ],
      cta: 'Get Started',
      recommended: false,
      isDark: false,
      hasToggle: false,
    },
  ];

  const savings = Math.round(((6.99 * 12 - 59.88) / (6.99 * 12)) * 100);

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa2284] via-[#ff8b00] to-[#00afe4]">
            Free to start.
          </span>{' '}
          Upgrade when you're ready.
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
          Kidera grows with your family. Start free and add more storage and features as your memories multiply.
        </p>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan, idx) => (
              <div key={idx} className="relative">
                <Card
                  className={`relative h-full transition-all duration-300 hover:shadow-xl border ${
                    plan.isDark 
                      ? 'bg-gradient-to-br from-gray-900 to-blue-900 border-gray-700 text-white' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  style={{
                    borderRadius: '24px',
                    padding: '32px',
                  }}
                >
                  <div className="text-left mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-2xl font-bold ${plan.isDark ? 'text-white' : 'text-gray-900'}`}>
                        {plan.name}
                      </h3>
                      {plan.hasToggle && (
                        <button
                          onClick={() => setIsYearly(!isYearly)}
                          className="bg-gray-700 px-3 py-1 rounded-full text-xs font-medium text-white hover:bg-gray-600 transition-all flex items-center"
                        >
                          {isYearly ? 'Yearly' : 'Monthly'}
                          {isYearly && (
                            <span className="ml-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                              Save {savings}%
                            </span>
                          )}
                        </button>
                      )}
                    </div>
                    <p className={`text-sm mb-6 ${plan.isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {plan.description}
                    </p>
                    <div className="flex items-baseline mb-2">
                      <span className={`text-5xl font-bold ${plan.isDark ? 'text-white' : 'text-gray-900'}`}>
                        {plan.hasToggle 
                          ? (isYearly ? plan.yearlyPrice : plan.monthlyPrice)
                          : plan.price
                        }
                      </span>
                      <span className={`text-xl ml-1 ${plan.isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {plan.hasToggle 
                          ? (isYearly ? plan.yearlyPeriod : plan.monthlyPeriod)
                          : plan.period
                        }
                      </span>
                    </div>
                    {plan.hasToggle && isYearly && (
                      <p className="text-sm text-green-400 font-medium mb-6">
                        Billed yearly at {plan.yearlyBilled}
                      </p>
                    )}
                  </div>

                  <Button 
                    size="lg" 
                    className={`w-full py-3 px-6 text-base font-semibold rounded-xl transition-all duration-300 mb-8 ${
                      plan.isDark 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white border-0' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white border border-gray-300'
                    }`}
                    onClick={() => {
                      if (plan.name === 'Legacy Plan') {
                        const planParam = isYearly ? 'legacy-yearly' : 'legacy';
                        window.location.href = `https://www.kidera.app/login?plan=${planParam}`;
                      } else if (plan.name === 'Free Plan') {
                        window.location.href = 'https://www.kidera.app';
                      }
                    }}
                  >
                    {plan.cta} →
                  </Button>

                  <div className="space-y-1">
                    <h4 className={`text-sm font-medium mb-4 ${plan.isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Includes
                    </h4>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 ${
                          plan.isDark ? 'bg-blue-500' : 'bg-blue-500'
                        }`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className={`text-sm leading-relaxed ${plan.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 