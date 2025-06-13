import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const testimonials = [
  {
    id: 1,
    quote: "Kidera has been a game-changer for our family. I love how it organizes all our memories by date and child. The AI summaries help me see patterns in my toddler's development that I would have missed otherwise.",
    author: 'Sarah, mom of three',
    role: 'Working mother',
    rating: 5
  },
  {
    id: 2,
    quote: "As a new dad, I was terrible at keeping track of all the milestones. Kidera makes it so easy to log moments throughout the day. The face evolution feature is our favorite - seeing how much our baby changes week to week is incredible.",
    author: 'Michael',
    role: 'First-time father',
    rating: 5
  },
  {
    id: 3,
    quote: "I've tried every baby tracking app out there, but Kidera is the only one that stuck. The interface is intuitive, and I love that I can add photos, videos, and notes all in one place. It's like a digital baby book but so much better.",
    author: 'Jamie',
    role: 'Parent of twins',
    rating: 5
  },
  {
    id: 4,
    quote: "The weekly AI summaries are worth the subscription alone. I work long hours and often miss small moments, but Kidera helps me stay connected to my kids' daily lives. My partner and I love looking through the updates together.",
    author: 'David',
    role: 'Busy professional dad',
    rating: 5
  },
  {
    id: 5,
    quote: "I was skeptical about another parenting app, but Kidera surprised me. It's not just another baby tracker - it captures the emotional journey of parenting. The memories we've preserved are priceless.",
    author: 'Priya',
    role: 'Mother of two under 3',
    rating: 5
  },
  {
    id: 6,
    quote: "The face evolution feature made me cry happy tears. It's incredible to see how much our little one has grown over the past year, all in one place. Kidera helps us cherish every stage.",
    author: 'Alex & Taylor',
    role: 'Adoptive parents',
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    dragFree: false,
    breakpoints: {
      '(min-width: 1024px)': { 
        slidesToScroll: 1,
        align: 'start'
      },
      '(min-width: 768px)': { 
        slidesToScroll: 1,
        align: 'start'
      }
    }
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [cardsPerView, setCardsPerView] = useState(1);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);
  
  // Handle responsive behavior
  useEffect(() => {
    const updateCardsPerView = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };
    
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);
  
  // Group testimonials in sets of cardsPerView for smooth sliding
  const groupedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += cardsPerView) {
    groupedTestimonials.push(testimonials.slice(i, i + cardsPerView));
  }

  return (
    <section id="testimonials" className="py-16 relative overflow-hidden">
      {/* Background with different images for mobile and desktop */}
      <div className="absolute inset-0">
        {/* Mobile background */}
        <div 
          className="md:hidden absolute inset-0"
          style={{
            backgroundImage: "url('/momsunmobile.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Desktop background */}
        <div 
          className="hidden md:block absolute inset-0"
          style={{
            backgroundImage: "url('/momsun.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
      <div className="container-narrow relative z-10">
        <blockquote className="text-center mb-12">
          <p className="text-3xl md:text-4xl font-medium italic mb-4">"I wish I started this sooner."</p>
          <footer className="text-gray-600">— Every parent ever</footer>
        </blockquote>
        
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {groupedTestimonials.map((group, groupIndex) => (
                <div 
                  key={groupIndex} 
                  className="flex-[0_0_100%] min-w-0 px-1"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {group.map((testimonial) => (
                      <div key={testimonial.id} className="h-full">
                        <TestimonialCard testimonial={testimonial} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all z-10"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all z-10"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="flex justify-center mt-8 space-x-2">
            {groupedTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedIndex ? 'bg-gray-800 w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-soft h-full flex flex-col border border-white/20" style={{ minHeight: '200px' }}>
    <div className="flex items-center space-x-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-200'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
    </div>
    <p className="text-gray-600 italic mb-4 flex-grow">"{testimonial.quote}"</p>
    <div className="mt-auto">
      <div className="font-medium text-sm">{testimonial.author}</div>
      <div className="text-xs text-gray-500">{testimonial.role}</div>
    </div>
  </div>
);

export default TestimonialsSection;
