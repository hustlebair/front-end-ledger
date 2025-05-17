
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  return (
    <section className="py-20 bg-blush-gradient">
      <div className="container-narrow text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start your child's story today.
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
          Don't let another precious memory fade away. Begin your journal in just a minute.
        </p>
        <Button size="lg">Create Your First Entry</Button>
      </div>
    </section>
  );
};

export default CtaSection;
