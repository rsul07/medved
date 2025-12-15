import React, { useState, useEffect } from 'react';
import { Animal } from '../types';
import { STATUS_LABELS } from '../constants';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface AnimalPanelProps {
  animal: Animal | null;
  onClose: () => void;
}

const AnimalPanel: React.FC<AnimalPanelProps> = ({ animal, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when animal changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [animal]);

  if (!animal) return null;

  const status = STATUS_LABELS[animal.conservationStatus];
  const hasMultipleImages = animal.images.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % animal.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + animal.images.length) % animal.images.length);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Fallback if local image isn't found
    e.currentTarget.src = 'https://placehold.co/800x600?text=No+Photo';
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-y-auto">
      {/* Header Image Gallery */}
      <div className="relative h-56 sm:h-72 bg-gray-200 shrink-0 group">
        <img 
          src={animal.images[currentImageIndex]} 
          alt={`${animal.name} - фото ${currentImageIndex + 1}`}
          onError={handleImageError} 
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
        
        {/* Navigation Controls */}
        {hasMultipleImages && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1.5">
              {animal.images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full shadow-sm transition-colors ${
                    idx === currentImageIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-sm z-10"
        >
          <X size={20} />
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-3xl font-bold leading-tight mb-1">{animal.name}</h2>
          <p className="text-sm opacity-90 italic flex items-center gap-2">
            {animal.scientificName}
            {hasMultipleImages && (
              <span className="flex items-center gap-1 text-xs bg-white/20 px-2 py-0.5 rounded-full ml-auto">
                <Camera size={12} /> {currentImageIndex + 1}/{animal.images.length}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col gap-6">
        
        {/* Status Badge */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <span className={`h-4 w-4 rounded-full ${status.color} shadow-sm`}></span>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Статус охраны</span>
            <span className="text-sm font-semibold text-gray-700">
              {status.label}
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-forest-800 mb-3 border-b border-forest-100 pb-2">Об обитателе</h3>
          <p className="text-wood-900 leading-relaxed text-base">
            {animal.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimalPanel;