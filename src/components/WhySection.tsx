
const WhySection = () => {
  return (
    <section className="relative py-24 bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.70)), url(/family.jpg)' }}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      <div className="relative z-10">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 max-w-[80%] mx-auto md:max-w-none md:mx-0">
            <div className="rounded-2xl overflow-hidden shadow-xl transform rotate-1 hover:rotate-0 transition-all duration-500 hover:shadow-2xl bg-black/5 backdrop-blur-sm">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-auto max-h-[400px] object-cover"
              >
                <source src="/kiderakids.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              They Grow. You Blink. It's Gone.
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              Kidera was built by a new dad who wanted a simple way to preserve the memories he never wanted to forget—from first words to sleepy snuggles.
            </p>
            <blockquote className="border-l-4 border-blush-400 pl-4 italic text-gray-700 font-light">
              "I started Kidera because I kept forgetting the small, beautiful details of my daughter's first year."
            </blockquote>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default WhySection;
