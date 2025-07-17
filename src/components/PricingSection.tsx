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

const PricingSection = () => {
  const plans = [
    {
      name: 'Free Plan',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started with essential features',
      features: [
        'Unlimited Text Entries',
        '500MB Media Storage (photos & videos)',
        'Premium AI Photo Tools (credits required)',
        'Limited AskKidera Access',
        'Weekly AI Summaries',
      ],
      cta: 'Start Free Today',
      recommended: false,
      borderColor: 'border-gray-200',
      buttonColor: 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600',
    },
    {
      name: 'Milestone Plan',
      price: '$8',
      period: '/month',
      description: 'Ideal for capturing every precious moment',
      features: [
        'Unlimited Text Entries',
        '15GB Media Storage (photos & videos)',
        'Premium AI Photo Tools (credits required)',
        '200 Monthly AI Credits',
        'Full AskKidera Access',
        'Weekly AI Summaries',
        'Face Cropping Software',
        'Priority Support',
        'Data Export',
      ],
      cta: 'Get Milestone Plan',
      recommended: true,
      borderColor: 'border-orange-400',
      buttonColor: 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] hover:from-[#e53e3e] hover:to-[#dd6b20]',
    },
    {
      name: 'Legacy Plan',
      price: '$14',
      period: '/month',
      description: 'Premium experience for lasting memories',
      features: [
        'Unlimited Text Entries',
        '50GB Media Storage (photos & videos)',
        'Premium AI Photo Tools (credits required)',
        '600 Monthly AI Credits',
        'Full AskKidera Access',
        'Weekly AI Summaries',
        'Face Cropping Software',
        'Priority Support',
        'Data Export',
        'Access to New Features First',
      ],
      cta: 'Get Legacy Plan',
      recommended: false,
      borderColor: 'border-blue-400',
      buttonColor: 'bg-gradient-to-r from-[#00afe4] to-[#0098cc] hover:from-[#0098cc] hover:to-[#0088b3]',
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa2284] via-[#ff8b00] to-[#00afe4]">
            Free to start.
          </span>{' '}
          Upgrade when you're ready.
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
          Kidera grows with your family. Start free and add more storage and features as your memories multiply.
        </p>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative group ${
                  plan.recommended ? 'md:scale-105' : ''
                }`}
              >
                                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-300 group-hover:-translate-y-2">
                      <span className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300">
                        Most Popular
                      </span>
                    </div>
                  )}
                <Card
                  className={`relative flex flex-col h-full bg-white rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
                    plan.recommended 
                      ? 'border-3 border-orange-400 shadow-[0_0_30px_rgba(255,107,53,0.3)] group-hover:shadow-[0_0_30px_rgba(255,107,53,0.3)]' 
                      : plan.name === 'Legacy Plan'
                      ? 'border border-blue-400 hover:shadow-[0_0_30px_rgba(0,175,228,0.3)]'
                      : 'border border-gray-200'
                  }`}
                  style={{
                    padding: '40px 30px',
                  }}
                >
                  {/* Top border gradient */}
                                     <div
                     className={`absolute top-0 left-0 right-0 h-1 ${
                       plan.recommended
                         ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e]'
                         : plan.name === 'Legacy Plan'
                         ? 'bg-gradient-to-r from-[#00afe4] to-[#0098cc]'
                         : 'bg-gradient-to-r from-gray-400 to-gray-500'
                     }`}
                   />
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">
                      {plan.description}
                    </p>
                    <div className="mb-4">
                      <span className="text-5xl font-extrabold text-gray-800">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 text-base font-medium ml-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full mr-3 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    size="lg" 
                    className={`w-full py-4 px-6 text-base font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 ${plan.buttonColor} text-white rounded-xl`}
                    onClick={() => {
                      if (plan.name === 'Milestone Plan') {
                        window.location.href = 'https://www.kidera.app/login?plan=milestone';
                      } else if (plan.name === 'Free Plan') {
                        window.location.href = 'https://www.kidera.app';
                      } else if (plan.name === 'Legacy Plan') {
                        window.location.href = 'https://www.kidera.app/login?plan=legacy';
                      }
                    }}
                  >
                    {plan.cta}
                  </Button>
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