import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export default function Gallery() {
  const scrollRef = useRef(null);

  const images = [
    {
      id: 1,
      src: '/src/img1.jpeg',
      title: 'Worli Seaface Ride',
      subtitle: 'Group cycling'
    },
    {
      id: 2,
      src: '/src/img4.jpeg',
      title: 'Premium Gear Cycles',
      subtitle: 'Sunset on Wheels'
    },
    {
      id: 3,
      src: '/src/img7.jpeg',
      title: 'Park, Pause & Enjoy the View',
      subtitle: 'Scenic coastal pitstop during early morning rides'
    },
    {
      id: 4,
      src: '/src/img2.jpeg',
      title: 'Spotlight on Seaface',
      subtitle: 'Celebrity guests making memories with our premium fleet'
    },
    {
      id: 5,
      src: '/src/img5.jpeg',
      title: 'Ridden by the Stars',
      subtitle: 'When icons choose PedalPro for their coastline leisure'
    },
    {
      id: 6,
      src: '/src/img3.jpeg',
      title: 'Dignity in Motion',
      subtitle: 'Distinguished IAS officers choosing eco-friendly travel along Worli Seaface'
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="gallery" className="py-20 bg-[#0F172A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold mb-3">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Ride Moments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Our Gallery
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Swipe right to explore rides, cycles, and scenic Worli Seaface routes.
            </p>
          </div>

          {/* Controls for Desktop */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white hover:bg-slate-700 transition"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white hover:bg-slate-700 transition"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container with Touch Swipe Support */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((img) => (
            <div
              key={img.id}
              className="snap-start flex-none w-[280px] sm:w-[350px] md:w-[400px] group relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl"
            >
              <div className="h-72 sm:h-80 w-full overflow-hidden">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>

              {/* Overlay Gradient & Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-lg font-bold text-white drop-shadow-md">{img.title}</h3>
                <p className="text-xs text-sky-300 font-medium mt-1">{img.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}