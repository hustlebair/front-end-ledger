
const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-blush-gradient-2">
      <div className="container-narrow">
        <blockquote className="text-center mb-16">
          <p className="text-3xl md:text-4xl font-medium italic mb-6">"I wish I started this sooner."</p>
          <footer className="text-gray-600">— Every parent ever</footer>
        </blockquote>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-soft">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">
                "Little Ledger has helped me capture moments I would have completely forgotten about. It's so simple to use even when I'm exhausted."
              </p>
              <div className="font-medium">
                {index === 1 ? 'Sarah, mom of two' : index === 2 ? 'Michael, first-time dad' : 'Jamie, parent of a toddler'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
