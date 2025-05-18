
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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
      name: "Moments",
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
      cta: "Get Moments",
      highlight: true,
      recommended: true
    },
    {
      name: "Legacy",
      price: "$14.99",
      period: "per month",
      description: "Create lasting family heirlooms",
      features: [
        "Everything in Moments",
        "Physical photo book (yearly)",
        "Family sharing (up to 5)",
        "Custom printing credits",
        "Personal memory consultant",
        "Priority support"
      ],
      cta: "Choose Legacy",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          Free to start. Upgrade when you're ready.
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
          Little Ledger grows with your family. Start free and add more storage as your memories multiply.
        </p>
        
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative border overflow-hidden ${
                  plan.highlight 
                    ? 'border-blush-200 shadow-md' 
                    : ''
                } ${plan.recommended ? 'ring-2 ring-blush-500' : ''} pricing-card`}
                style={{
                  backgroundClip: 'padding-box',
                  border: '1px solid transparent',
                  position: 'relative',
                }}
              >
                <div 
                  className="absolute inset-0 -z-10" 
                  style={{ 
                    background: 'linear-gradient(to right, #F28CA5, #B187F2)', 
                    margin: '-1px',
                    borderRadius: 'inherit',
                  }}
                />
                
                {plan.recommended && (
                  <Badge 
                    className="absolute -top-2 right-4 bg-blush-500"
                  >
                    Recommended
                  </Badge>
                )}
                
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4 mb-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 ml-1">/{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    variant={plan.highlight ? "default" : "outline"} 
                    className={`w-full ${plan.highlight ? 'gradient-filled' : 'gradient-outline hover:bg-gradient-to-r hover:from-[#F28CA5] hover:to-[#B187F2] hover:text-white'}`}
                    size="lg"
                    style={{
                      background: plan.highlight ? 'linear-gradient(to right, #F28CA5, #B187F2)' : 'transparent',
                      border: '1px solid transparent',
                      position: 'relative',
                      backgroundClip: plan.highlight ? 'border-box' : 'padding-box',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {!plan.highlight && (
                      <div 
                        className="absolute inset-0 -z-10" 
                        style={{ 
                          background: 'linear-gradient(to right, #F28CA5, #B187F2)',
                          margin: '-1px',
                          borderRadius: 'inherit',
                        }}
                      />
                    )}
                    <span>{plan.cta}</span>
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
