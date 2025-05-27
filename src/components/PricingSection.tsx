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
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Unlimited text entries',
        '30 photos per month',
        '5 videos per month',
        'Basic search',
      ],
      cta: 'Start Free',
      highlight: false,
      recommended: false,
      glowColor: 'rgba(0, 0, 0, 0.1)',        // grey glow
    },
    {
      name: 'Moments',
      price: '$7.99',
      period: 'per month',
      description: 'For the complete memory archive',
      features: [
        'Unlimited text entries',
        'Unlimited photos & videos',
        'Advanced AI summaries',
        'Face recognition',
        'Cloud backup',
        'Timeline visualization',
      ],
      cta: 'Get Moments',
      highlight: true,
      recommended: true,
      glowColor: 'rgba(242, 140, 165, 0.5)',  // coral pink glow
    },
    {
      name: 'Legacy',
      price: '$14.99',
      period: 'per month',
      description: 'Create lasting family heirlooms',
      features: [
        'Everything in Moments',
        'Physical photo book (yearly)',
        'Family sharing (up to 5)',
        'Custom printing credits',
        'Personal memory consultant',
        'Priority support',
      ],
      cta: 'Choose Legacy',
      highlight: false,
      recommended: false,
      glowColor: 'rgba(177, 135, 242, 0.5)',  // lavender-violet glow
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          Free to start. Upgrade when you’re ready.
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
          Little Ledger grows with your family. Start free and add more
          storage as your memories multiply.
        </p>

        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className="relative flex flex-col h-full overflow-hidden pricing-card"
                style={{
                  backgroundClip: 'padding-box',
                  border: '1px solid transparent',
                  boxShadow: `0 0 15px ${plan.glowColor}`,
                }}
              >
                {/* gradient border behind */}
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    background: 'linear-gradient(to right, #F28CA5, #B187F2)',
                    margin: '-1px',
                    borderRadius: 'inherit',
                  }}
                />

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
                    {/* Glow effect - only show for Moments and Legacy plans */}
                    {plan.name !== 'Free' && (
                      <div 
                        className="absolute -inset-0.5 rounded-lg blur-sm transition-all duration-300 group-hover:blur"
                        style={{
                          backgroundColor: plan.name === 'Moments' 
                            ? 'rgba(242, 140, 165, 0.7)' 
                            : 'rgba(177, 135, 242, 0.7)',
                          boxShadow: `0 0 10px 5px ${
                            plan.name === 'Moments' 
                              ? 'rgba(242, 140, 165, 0.7)' 
                              : 'rgba(177, 135, 242, 0.7)'
                          }`
                        }}
                      />
                    )}
                    
                    {/* Button */}
                    <Button 
                      size="lg" 
                      className={`relative z-10 w-full ${
                        plan.name === 'Free' 
                          ? 'bg-gray-900 hover:bg-gray-800' 
                          : 'bg-gray-900 hover:bg-gray-800'
                      } text-white transition-all duration-300`}
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
