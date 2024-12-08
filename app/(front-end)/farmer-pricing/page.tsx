import React from 'react';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  title: string;
  isRecommended: boolean;
  description: string;
  price: string;
  features: PlanFeature[];
  link: string;
  buttonText: string;
}

const plans: PricingPlan[] = [
  {
    title: 'Free',
    isRecommended: false,
    description: "+5% transaction fee. It's Good For Starters",
    price: '$0',
    features: [
      { name: 'All features', included: true },
      { name: 'Unlimited products', included: true },
      { name: 'Unlimited revenue', included: true },
    ],
    link: '/register-farmer?plan=free',
    buttonText: 'Start for free',
  },
  {
    title: 'Silver',
    isRecommended: true,
    description: "+2% transaction fee. It's Good if your revenue is above $500",
    price: '$20',
    features: [
      { name: 'All features', included: true },
      { name: 'Unlimited products', included: true },
      { name: 'Unlimited revenue', included: true },
    ],
    link: '/register-farmer?plan=silver',
    buttonText: 'Get started',
  },
  {
    title: 'Gold',
    isRecommended: false,
    description:
      "No transaction fee. Is Good if you're earning more than $5000 in revenue",
    price: '$99',
    features: [
      { name: 'All features', included: true },
      { name: 'Unlimited products', included: true },
      { name: 'Unlimited revenue', included: true },
    ],
    link: '/register-farmer?plan=gold',
    buttonText: 'Get Started',
  },
];

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">
          Choose a plan that suits you
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          Discover simplicity in pricing with us. Our straightforward and
          competitive rates ensure you get the best value. No hidden fees, just
          transparent options to meet your needs. Choose clarity, choose Limi
          Commerce.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={plan.isRecommended ? 'border-brandColor shadow-lg' : ''}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold">
                  {plan.title}
                </CardTitle>
                {plan.isRecommended && (
                  <Badge
                    className=" bg-brandColor text-white"
                    variant="secondary"
                  >
                    Recommended
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    {feature.included ? (
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                    ) : (
                      <X className="mr-2 h-5 w-5 text-red-500" />
                    )}
                    <span
                      className={
                        feature.included ? '' : 'text-muted-foreground'
                      }
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={plan.link}>{plan.buttonText}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
