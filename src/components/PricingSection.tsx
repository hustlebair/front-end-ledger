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
      description: 'Ideal for capturing every precious moment',
      features: [
        'Unlimited Text Entries',
        '20GB Media Storage [Photo/Video]',
        'AI Photo Tools (credits required)',
        '1,000 Free Credits',
        'Unlimited <em>Kidera</em> AI Agent',
        'Weekly AI Summaries',
        'Face Cropping Software',
        'Priority Support',
        'Data Export',
      ],
      cta: 'Get Started',
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

        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center">
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
                  <div className="text-left mb-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-2xl font-bold ${plan.isDark ? 'text-white' : 'text-gray-900'}`}>
                        {plan.name}
                      </h3>
                    </div>
                    <p className={`text-sm mb-6 ${plan.isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {plan.description}
                    </p>
                                         <div className="flex items-baseline mb-2">
                       <span className={`text-5xl font-bold ${plan.isDark ? 'text-white' : 'text-gray-900'}`}>
                         {plan.price}
                       </span>
                       <span className={`text-xl ml-1 ${plan.isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                         {plan.period}
                       </span>
                     </div>
                     <div className="h-6 mb-2">
                       <p className="text-sm text-green-400 font-medium">
                         Billed annually at {plan.yearlyBilled} - Limited Time
                       </p>
                     </div>
                  </div>

                  <Button 
                    size="lg" 
                    className={`w-full py-3 px-6 text-base font-semibold rounded-xl transition-all duration-300 mb-8 mt-2 ${
                      plan.isDark 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white border-0' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white border border-gray-300'
                    }`}
                                         onClick={() => {
                       window.location.href = 'https://www.kidera.app/login?plan=legacy-yearly';
                     }}
                  >
                    {plan.cta} →
                  </Button>

                  <div className="space-y-1">
                    <h4 className={`text-base font-semibold mb-3 ${plan.isDark ? 'text-white' : 'text-gray-600'}`}>
                      Includes
                    </h4>
                    {plan.isDark && (
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-4"></div>
                    )}
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 ${
                          plan.isDark ? 'bg-blue-500' : 'bg-blue-500'
                        }`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span 
                          className={`text-sm leading-relaxed ${plan.isDark ? 'text-white' : 'text-gray-700'}`}
                          dangerouslySetInnerHTML={{ __html: feature }}
                        />
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