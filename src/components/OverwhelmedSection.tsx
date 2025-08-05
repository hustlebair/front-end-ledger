import React from 'react';

const OverwhelmedSection = () => {
  const cards = [
    {
      icon: <div className="text-4xl">📸</div>,
      title: "Scattered Photos",
      description: "Hundreds of photos scattered across different apps, with no organization or context about what made each moment special."
    },
    {
      icon: <div className="text-4xl">😴</div>,
      title: "Forgotten Moments",
      description: "Those sweet bedtime conversations and funny things they said that seemed impossible to forget—but somehow you did."
    },
    {
      icon: <div className="text-4xl">🤯</div>,
      title: "Chaos Overwhelm",
      description: "The exhaustion of parenting leaves little energy for organizing memories, so precious moments slip through the cracks."
    },
    {
      icon: <div className="text-4xl">⏰</div>,
      title: "Time Flies",
      description: "Days blur together in the beautiful chaos of raising kids. Before you know it, you'll forget what made this day unique."
    }
  ];

  return (
    <section className="py-16 px-4 shadow-lg bg-gradient-to-br from-gray-50 to-white">
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
              className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center h-full"
              style={{ backgroundColor: '#FFF8F2' }}
            >
              <div className="mb-4">
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
