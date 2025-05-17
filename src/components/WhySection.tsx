
const WhySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="rounded-xl overflow-hidden shadow-soft transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Parent with child" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              You blink, and it's gone.
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              Little Ledger was built by a new dad who wanted a simple way to preserve the memories he never wanted to forget—from first words to sleepy snuggles.
            </p>
            <blockquote className="border-l-4 border-blush-300 pl-4 italic text-gray-600 font-light">
              "I started Little Ledger because I kept forgetting the small, beautiful details of my daughter's first year."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
