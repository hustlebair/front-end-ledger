
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 bg-blush-gradient">
      <div className="container-narrow text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
          Because they won't be this little forever.
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto animate-fade-up">
          Little Ledger helps parents capture the moments they'll wish they remembered.
        </p>
        <Button size="lg" className="animate-fade-up animate-delay-200">
          Start Remembering More
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
