
import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "Stay Organized, Stay Productive",
      subtitle: "Manage your tasks effortlessly with our smart and intuitive platform",
      description: "Boost your efficiency with seamless task tracking, reminders, and collaboration tools all in one place.",
      buttonText: "Start Organizing Today",
      handleClick: () => navigate('/allTask'),
      imgSrc: "https://i.ibb.co.com/s9p7QM2C/hr-specialist.webp"
    },
    {
      id: 2,
      title: "Simplify Your Task Management",
      subtitle: "Plan, prioritize, and accomplish more with ease",
      description: "Stay on top of your tasks with our intuitive platform—smart scheduling, real-time collaboration, and effortless productivity.",
      buttonText: "Get Started Now",
      handleClick: () => navigate('/register'),
      imgSrc: "https://i.ibb.co.com/tbsbMrj/Banner-Img2.jpg"
    },
  ];

  useEffect(() => {
    if (!isAnimating) {
      const timer = setInterval(handleNextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [isAnimating, currentSlide]);

  const handleNextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setSlideDirection('right');
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const handlePrevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setSlideDirection('left');
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden bg-[#212428]">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#212428]/80 via-transparent to-[#212428]/80 z-10" />
      
      {/* Slides Container */}
      <div className="relative h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-800 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : slideDirection === 'right' && index === (currentSlide - 1 + slides.length) % slides.length
                ? 'opacity-0 -translate-x-full'
                : slideDirection === 'left' && index === (currentSlide + 1) % slides.length
                ? 'opacity-0 translate-x-full'
                : 'opacity-0'
            }`}
            style={{
              transitionProperty: 'transform, opacity',
              transitionDuration: '800ms',
              transform: index === currentSlide 
                ? 'translateX(0)' 
                : slideDirection === 'right' && index === (currentSlide - 1 + slides.length) % slides.length
                ? 'translateX(-100%)' 
                : slideDirection === 'left' && index === (currentSlide + 1) % slides.length
                ? 'translateX(100%)'
                : index < currentSlide ? 'translateX(-100%)' : 'translateX(100%)'
            }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.imgSrc}
                alt={slide.title}
                className="w-full h-full md:h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#212428]/70 via-[#212428]/50 to-[#212428]/70" />
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex items-center justify-center">
              <div className="text-center max-w-4xl mx-auto px-6">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-3 text-gray-200">{slide.subtitle}</p>
                <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">{slide.description}</p>
                <button 
                  onClick={slide.handleClick}
                  className="px-8 py-4 bg-gradient-to-r from-[#294C5F] to-[#212428] text-white rounded-lg font-medium hover:from-[#212428] hover:to-[#294C5F] shadow-lg border border-[#38A1DB] cursor-pointer"
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute z-30 inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8">
        <button
          onClick={handlePrevSlide}
          disabled={isAnimating}
          className="hidden md:block p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300"
          aria-label="Previous slide"
        >
          <MdChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={handleNextSlide}
          disabled={isAnimating}
          className="hidden md:block p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300"
          aria-label="Next slide"
        >
          <MdChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
      
      {/* Dots Navigation */}
      <div className="absolute z-30 bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating && index !== currentSlide) {
                setIsAnimating(true);
                setSlideDirection(index > currentSlide ? 'left' : 'right');
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 800);
              }
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-[#38A1DB]' 
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            disabled={isAnimating}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;