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
      description: 'Start your journey with basic features',
      features: [
        'Unlimited Text Entries',
        '500MB Media Storage (photos & videos)',
        '40 free credits to use on AI photo enhancements',
        'Limited AskKidera Usage',
        'Data Export',
      ],
      cta: 'Continue Free',
      recommended: false,
      borderColor: 'border-gray-200',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
    },
    {
      name: 'Milestone Plan',
      price: '$8',
      period: '/month',
      description: "Perfect for tracking important moments in your child's development",
      features: [
        'Unlimited Text Entries',
        '15GB Media Storage (photos & videos)',
        '200 Monthly Credits',
        'AskKidera Access',
        'Weekly AI Summary',
        'Face Crop',
        'Data Export',
      ],
      cta: 'Get Milestone Plan',
      recommended: true,
      borderColor: 'border-orange-400',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
    },
    {
      name: 'Legacy Plan',
      price: '$14',
      period: '/month',
      description: 'Preserve precious memories for future generations',
      features: [
        'Unlimited Text Entries',
        '50GB Media Storage (photos & videos)',
        '600 Monthly Credits',
        'AskKidera Access',
        'Weekly AI Summary',
        'Face Crop',
        'Data Export',
      ],
      cta: 'Get Legacy Plan',
      recommended: false,
      borderColor: 'border-blue-400',
      buttonColor: 'bg-blue-400 hover:bg-blue-500',
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
          Kidera grows with your family. Start free and add more storage as your memories multiply.
        </p>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className={`relative flex flex-col h-full bg-white rounded-lg shadow-md ${plan.borderColor} ${plan.recommended ? 'border-2' : 'border'}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 ml-1">
                      {plan.period}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pb-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button 
                    size="lg" 
                    className={`w-full font-semibold ${plan.buttonColor} text-white transition-all duration-300`}
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
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 