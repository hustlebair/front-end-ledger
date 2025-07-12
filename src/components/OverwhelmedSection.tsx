import React from 'react';
import { Clock, Heart, Camera, Calendar } from 'lucide-react';

const OverwhelmedSection = () => {
  const cards = [
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: '"I\'ll Do It Later" Syndrome',
      description: 'You meant to write it down… but now the moment\'s gone.'
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      title: 'Memory Guilt',
      description: 'You can\'t recall when they first smiled or said "mama." It eats at you.'
    },
    {
      icon: <Camera className="w-8 h-8 text-yellow-500" />,
      title: 'Camera Roll Chaos',
      description: 'Thousands of photos, no context. What\'s worth keeping?'
    },
    {
      icon: <Calendar className="w-8 h-8 text-purple-500" />,
      title: 'Repetitive Days Blur Together',
      description: 'The early months are a fog. You\'re afraid you\'ll forget what made this day unique.'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The Future of Family <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa2284] via-[#ff8b00] to-[#00afe4]">Memory Making</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced AI handles the chaos of scattered photos and forgotten moments, turning them into beautiful, organized memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center h-full"
            >
              <div className="mb-4 p-3 bg-gray-50 rounded-full">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-pink-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto text-center">
          <p className="font-bold text-gray-900">
            Parents forget <span className="text-red-500">90% of early memories</span> if they don't record them.
          </p>
          <p className="text-gray-700 mt-2">
            Kidera makes it effortless to preserve them — even when you're exhausted.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OverwhelmedSection;
