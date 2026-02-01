'use client';

import React, { useState, useRef } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      setSliderPos(percent);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video overflow-hidden rounded-xl cursor-ew-resize group"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* Before Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${beforeImage})` }}
      />
      
      {/* After Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${afterImage})`,
          clipPath: `inset(0 0 0 ${sliderPos}%)`
        }}
      />

      {/* Slider Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)] z-10"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gold border-4 border-luxury-black flex items-center justify-center">
          <div className="flex space-x-0.5">
            <div className="w-0.5 h-3 bg-luxury-black rounded-full" />
            <div className="w-0.5 h-3 bg-luxury-black rounded-full" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-black/50 backdrop-blur-sm border border-white/10 text-xs tracking-widest text-white uppercase pointer-events-none">
        Before
      </div>
      <div className="absolute bottom-4 right-4 z-20 px-3 py-1 bg-gold/50 backdrop-blur-sm border border-gold/20 text-xs tracking-widest text-white uppercase pointer-events-none">
        After
      </div>
    </div>
  );
}
