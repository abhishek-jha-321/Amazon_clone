import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../../data/bannerData';

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  // Auto-advance banner every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <div className="relative max-w-[1500px] mx-auto select-none">
      {/* Slides Container */}
      <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/hero-image.jpg';
              }}
              className="w-full h-full object-cover object-top"
            />
          </div>
        ))}

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-2 top-[35%] -translate-y-1/2 z-20 p-2 md:p-3 text-gray-800 bg-white/40 hover:bg-white/80 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#f90] transition-colors"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 stroke-[2.5]" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2 top-[35%] -translate-y-1/2 z-20 p-2 md:p-3 text-gray-800 bg-white/40 hover:bg-white/80 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#f90] transition-colors"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 stroke-[2.5]" />
        </button>

        {/* Seamless bottom fade gradient to page background */}
        <div className="absolute inset-x-0 bottom-0 h-40 md:h-64 bg-gradient-to-t from-[#eaeded] via-[#eaeded]/70 to-transparent z-15 pointer-events-none" />
      </div>

      {/* Floating Amazon Disclaimer Message Bar */}
      <div className="relative z-20 -mt-16 sm:-mt-24 md:-mt-36 mx-4 sm:mx-6 md:mx-8 mb-6">
        <div className="bg-[#f5f6f6] border border-gray-300 text-center py-2.5 px-4 text-xs sm:text-sm text-gray-800 shadow-sm rounded-sm">
          <span>You are on amazon.com. You can also shop on Amazon India for millions of products with fast local delivery. </span>
          <a
            href="https://www.amazon.in"
            target="_blank"
            rel="noreferrer"
            className="text-amazon-link hover:text-amazon-linkHover hover:underline font-semibold ml-1 inline-flex items-center gap-0.5"
          >
            Click here to go to amazon.in
          </a>
        </div>
      </div>
    </div>
  );
};

