import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
      period: 'm',
      description: 'Start Remembering Now',
      features: [
        'Unlimited text entries',
        '1GB Media Storage (photo and Video)',
        '40 Free Credits',
        'Limited Ask Kidera™️',
        'Data Export'
      ],
      cta: 'Get Started',
      highlight: false,
      recommended: false,
      glowColor: 'transparent'  // No glow for free plan
    },
    {
      name: 'Milestone Plan',
      price: '$8',
      period: 'm',
      description: 'Everything you need',
      features: [
        'Unlimited Text entries',
        '15gb Media Storage (photos + videos)',
        '200 credits monthly',
        'Ask Kidera™️',
        'Weekly AI Summary',
        'Face Evolution',
        'Data Export'
      ],
      cta: 'Get Milestone Plan',
      highlight: true,
      recommended: true,
      glowColor: 'rgba(255, 139, 0, 0.5)'  // #ff8b00 with 50% opacity
    },
    {
      name: 'Legacy Plan',
      price: '$14',
      period: 'm',
      description: 'Never forgetting anything',
      features: [
        'Unlimited Text Entries',
        '50gb Media Storage (photos + videos)',
        '600 credits monthly',
        'Ask Kidera™️',
        'Weekly AI Summary',
        'Face Evolution',
        'Data Export'
      ],
      cta: 'Get Legacy Plan',
      highlight: false,
      recommended: false,
      glowColor: 'rgba(0, 175, 228, 0.5)'  // #00afe4 with 50% opacity
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          Free to start. Upgrade when you're ready.
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
          Kidera grows with your family. Start free and add more
          storage as your memories multiply.
        </p>

        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className={`relative flex flex-col h-full overflow-hidden pricing-card ${
                  plan.name === 'Free Plan' ? 'shadow-none' : ''
                }`}
                style={{
                  backgroundClip: 'padding-box',
                  border: '1px solid #e5e7eb',
                  ...(plan.name !== 'Free Plan' && {
                    border: '1px solid transparent',
                    boxShadow: `0 0 15px ${plan.glowColor}`
                  })
                }}
              >
                {/* gradient border behind - only for paid plans */}
                {plan.name !== 'Free Plan' && (
                  <div
                    className="absolute inset-0 -z-10"
                    style={{
                      background: 'linear-gradient(to right, #F28CA5, #B187F2)',
                      margin: '-1px',
                      borderRadius: 'inherit',
                    }}
                  />
                )}

                {plan.recommended && (
                  <Badge className="absolute top-2 right-4 bg-blush-500">
                    Most Popular
                  </Badge>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4 mb-2">
                    <span className="text-3xl font-bold">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 ml-1">
                      /{plan.period}
                    </span>
                  </div>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-auto">
                  <div className="relative inline-block w-full group">
                    {/* Glow effect for paid plans only */}
                    {plan.name !== 'Free Plan' && (
                      <div 
                        className="absolute -inset-0.5 rounded-lg blur-sm transition-all duration-300 group-hover:blur"
                        style={{
                          backgroundColor: plan.name === 'Milestone Plan' 
                            ? 'rgba(255, 139, 0, 0.4)' 
                            : 'rgba(0, 175, 228, 0.4)',
                          boxShadow: `0 0 8px 3px ${
                            plan.name === 'Milestone Plan' 
                              ? 'rgba(255, 139, 0, 0.4)' 
                              : 'rgba(0, 175, 228, 0.4)'
                          }`
                        }}
                      />
                    )}
                    {false && (
                      <div 
                        className="absolute -inset-0.5 rounded-lg blur-sm transition-all duration-300 group-hover:blur"
                        style={{
                          backgroundColor: plan.name === 'Moments Plan' 
                            ? 'rgba(255, 139, 0, 0.7)' 
                            : 'rgba(0, 175, 228, 0.7)',
                          boxShadow: `0 0 10px 5px ${
                            plan.name === 'Moments Plan' 
                              ? 'rgba(255, 139, 0, 0.7)' 
                              : 'rgba(0, 175, 228, 0.7)'
                          }`
                        }}
                      />
                    )}
                    
                    {/* Button */}
                    <Button 
                      size="lg" 
                      className={`relative z-10 w-full ${
                        plan.name === 'Free Plan' 
                          ? 'bg-gray-900 hover:bg-gray-800' 
                          : 'bg-gray-900 hover:bg-gray-800'
                      } text-white transition-all duration-300 hover:scale-105`}
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
                      <span className="relative z-10">
                        {plan.cta}
                      </span>
                      <motion.span 
                        className="absolute inset-0 bg-white/10"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                      />
                    </Button>
                  </div>
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
