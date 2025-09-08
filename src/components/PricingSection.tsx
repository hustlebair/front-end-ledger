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
      name: 'Legacy Plan',
      price: '$3.25',
      period: '/month',
      yearlyBilled: '$39',
      description: 'Never lose a precious moment again',
      features: [
        'Unlimited daily journal entries',
        '50GB secure photo & video storage',
        'AI Photo Magic Editor',
        '2,000 AI credits for creative tools',
        'Smart AI Assistant for parenting insights',
        'Weekly AI summaries of special moments',
        'Smart photo cropping & organization',
        'Priority support & data export',
      ],
      cta: 'Start 14 Day Free Trial',
      recommended: true,
      isDark: true,
      hasToggle: false,
    },
  ];


  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa2284] via-[#ff8b00] to-[#00afe4]">
            Limited Time Offer.
          </span>{' '}
          Start your legacy today.
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
          Capture every precious moment with our comprehensive parenting journal. Limited time offer - get started today!
        </p>

        <div className="max-w-md mx-auto">
          <div className="flex justify-center">
            {plans.map((plan, idx) => (
              <div key={idx} className="relative w-full">
                <Card
                  className="relative h-full transition-all duration-300 hover:shadow-xl bg-white border-0"
                  style={{
                    borderRadius: '16px',
                    padding: '0',
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {/* Gradient border at top */}
                  <div
                    className="bg-gradient-to-r from-pink-400 via-orange-400 via-green-400 to-blue-400"
                    style={{
                      height: '12px',
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px',
                    }}
                  ></div>
                  
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-bold text-gray-900 mb-3">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-5xl font-black text-gray-900">
                          {plan.price}
                        </span>
                        <span className="text-lg text-gray-500 ml-1">
                          {plan.period}
                        </span>
                      </div>
                      
                      <div className="flex justify-center mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-600 text-xs font-semibold">
                          Billed annually at {plan.yearlyBilled}
                          <span className="mx-2 text-gray-300">•</span>
                          Limited Time Offer ⏰
                        </span>
                      </div>
                    </div>

                    <Button 
                      size="lg" 
                      className="w-full py-4 px-6 text-base font-semibold rounded-xl transition-all duration-300 mb-8 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white border-0 shadow-[0_8px_20px_rgba(250,34,132,0.3)] hover:shadow-[0_12px_24px_rgba(250,34,132,0.4)] hover:-translate-y-0.5"
                      onClick={() => {
                        window.location.href = 'https://www.kidera.app/login?plan=legacy-yearly';
                      }}
                    >
                      {plan.cta} →
                    </Button>

                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">
                        Everything you need to capture childhood
                      </h4>
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start mb-3">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 bg-blue-500">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-gray-700 leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
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