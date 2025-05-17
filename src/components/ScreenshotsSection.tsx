
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const screenshots = [
  {
    id: 1,
    title: "Calendar View",
    description: "See your entries at a glance",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Memory Editor",
    description: "Simple yet powerful editing features",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 3,
    title: "AI Timeline",
    description: "Watch your child grow over time",
    imageSrc: "/placeholder.svg",
  },
];

const ScreenshotsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          Designed with parents in mind
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
          Simple, intuitive, and beautiful — just like the moments you're capturing.
        </p>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {screenshots.map((screenshot) => (
                <div key={screenshot.id} className="min-w-full px-4">
                  <div className="bg-gray-100 p-4 rounded-2xl shadow-soft mx-auto max-w-sm">
                    <img 
                      src={screenshot.imageSrc} 
                      alt={screenshot.title} 
                      className="app-screenshot w-full aspect-[9/16] object-cover"
                    />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold">{screenshot.title}</h3>
                    <p className="text-gray-600">{screenshot.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation controls */}
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {screenshots.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentIndex === index ? "bg-blush-500" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotsSection;
