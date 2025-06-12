
const WhySection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="rounded-2xl overflow-hidden shadow-xl transform rotate-1 hover:rotate-0 transition-all duration-500 hover:shadow-2xl">
              <img 
                src="/images/9 faces square.png" 
                alt="Faces evolution showing growth over time" 
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              They Grow. You Blink. It's Gone.
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              Kidera was built by a new dad who wanted a simple way to preserve the memories he never wanted to forget—from first words to sleepy snuggles.
            </p>
            <blockquote className="border-l-4 border-blush-300 pl-4 italic text-gray-600 font-light">
              "I started Kidera because I kept forgetting the small, beautiful details of my daughter's first year."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
