import React, { useState } from 'react';
import { MapZone, Animal } from '../types';
import { ANIMALS } from '../constants';
import { MapPin, Fish } from 'lucide-react';

interface MapBoardProps {
  zones: MapZone[];
  activeZoneId: string | null;
  onZoneClick: (zoneId: string, animalId: string) => void;
}

const MapBoard: React.FC<MapBoardProps> = ({ zones, activeZoneId, onZoneClick }) => {
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const getAnimal = (id: string): Animal | undefined => ANIMALS[id];

  const hoveredAnimal = hoveredZoneId 
    ? getAnimal(zones.find(z => z.id === hoveredZoneId)?.animalId || '') 
    : null;

  // Helper to split text into multiple tspans
  const renderLabel = (text: string, x: number, y: number, id?: string) => {
    const lines: string[] = [];
    
    // Custom logic for specific long names
    // Use upper case check to match the rendered text
    if (text.includes("КАВКАЗСКИЙ БЛАГОРОДНЫЙ") || id === 'red_deer') {
       lines.push("КАВКАЗСКИЙ");
       lines.push("БЛАГОРОДНЫЙ");
       lines.push("ОЛЕНЬ");
    } else if (text.includes("ЕНОТ-ПОЛОСКУН")) {
       lines.push("ЕНОТ-");
       lines.push("ПОЛОСКУН");
    } else if (text.includes("ЕНОТОВИДНАЯ")) {
       lines.push("ЕНОТОВИД.");
       lines.push("СОБАКА");
    } else if (text.includes("ОРЛАН-БЕЛОХВОСТ")) {
       lines.push("ОРЛАН");
       lines.push("БЕЛОХВОСТ");
    } else {
       const words = text.split(' ');
       if (words.length > 2) {
          lines.push(words.slice(0, 2).join(' '));
          lines.push(words.slice(2).join(' '));
       } else if (words.length === 2 && text.length > 10) {
          lines.push(words[0]);
          lines.push(words[1]);
       } else {
          lines.push(text);
       }
    }

    // Determine font size based on text length to fit small boxes
    const isSmall = text.length > 8 && lines.length > 1;
    const fontSize = id?.includes('raccoon') || id === 'fox' || id?.includes('eagle') || id === 'falcon' ? '10px' : '13px';

    return lines.map((line, i) => (
      <tspan 
        key={i} 
        x={x} 
        dy={i === 0 ? 0 : '1.1em'} 
        className="drop-shadow-sm"
        style={{ fontSize }}
      >
        {line}
      </tspan>
    ));
  };

  return (
    <div 
      className="relative w-full h-full bg-[#f5e6ca] overflow-hidden rounded-xl shadow-2xl border-4 border-[#8c603f] select-none font-sans"
      onMouseMove={handleMouseMove}
    >
      {/* Title Schema Style Background */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-[#8c603f]/10 pointer-events-none z-0"></div>

      {/* Main SVG Map */}
      <svg 
        className="w-full h-full" 
        viewBox="0 0 1000 600" 
        preserveAspectRatio="xMidYMid meet"
      >
        {/* River at Bottom */}
        <path 
          d="M 0,550 L 1000,550 L 1000,600 L 0,600 Z"
          fill="#3b82f6"
          stroke="none"
          className="opacity-90"
        />
        {/* River Ripples */}
        <path d="M 50,565 Q 100,555 150,565 T 250,565" stroke="white" strokeWidth="2" fill="none" opacity="0.5"/>
        <path d="M 600,580 Q 650,570 700,580 T 800,580" stroke="white" strokeWidth="2" fill="none" opacity="0.5"/>

        {/* Bridge (Entrance) */}
        <g id="bridge">
          {/* Bridge Base */}
          <rect x="525" y="545" width="30" height="60" fill="#d4b483" stroke="#8c603f" strokeWidth="2" />
          {/* Planks */}
          <line x1="525" y1="555" x2="555" y2="555" stroke="#8c603f" strokeWidth="1" opacity="0.5" />
          <line x1="525" y1="565" x2="555" y2="565" stroke="#8c603f" strokeWidth="1" opacity="0.5" />
          <line x1="525" y1="575" x2="555" y2="575" stroke="#8c603f" strokeWidth="1" opacity="0.5" />
          <line x1="525" y1="585" x2="555" y2="585" stroke="#8c603f" strokeWidth="1" opacity="0.5" />
          <line x1="525" y1="595" x2="555" y2="595" stroke="#8c603f" strokeWidth="1" opacity="0.5" />
          {/* Entrance Arrow Graphic */}
          <path d="M 540,615 L 540,590 L 535,595 M 540,590 L 545,595" stroke="#8c603f" strokeWidth="2" fill="none" transform="translate(0,-5)"/>
        </g>

        {/* Zones */}
        {zones.map((zone) => {
          const isActive = activeZoneId === zone.id;
          const isHovered = hoveredZoneId === zone.id;
          const animal = getAnimal(zone.animalId);
          const isPond = zone.animalId === 'swans';

          return (
            <g 
              key={zone.id}
              onClick={() => onZoneClick(zone.id, zone.animalId)}
              onMouseEnter={() => setHoveredZoneId(zone.id)}
              onMouseLeave={() => setHoveredZoneId(null)}
              className="cursor-pointer"
            >
              {/* Shadow for depth */}
              <path
                d={zone.path}
                fill="black"
                opacity="0.2"
                transform="translate(4, 4)"
              />

              {/* Main Zone Shape */}
              <path
                d={zone.path}
                fill={isPond ? '#60a5fa' : (isActive ? '#22c55e' : (isHovered ? '#4ade80' : '#65a30d'))}
                stroke={isActive ? '#facc15' : '#fefce8'}
                strokeWidth={isActive ? 4 : 2}
                className="transition-colors duration-200"
              />

              {/* Texture for Grass (if not pond) */}
              {!isPond && (
                 <path d={zone.path} fill="url(#grass-pattern)" opacity="0.1" className="pointer-events-none"/>
              )}

              {/* Label Text - with wrapping */}
              {animal && (
                <text 
                  x={zone.labelX} 
                  y={zone.labelY} 
                  textAnchor="middle" 
                  className="font-bold fill-white pointer-events-none uppercase tracking-wider"
                  style={{ fontFamily: 'sans-serif', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {renderLabel(animal.name.toUpperCase(), zone.labelX, zone.labelY, animal.id)}
                </text>
              )}
              
              {/* Icon for Pond */}
              {isPond && (
                <foreignObject x={zone.labelX - 12} y={zone.labelY + 20} width="24" height="24" className="pointer-events-none text-white/80">
                   <Fish size={24} />
                </foreignObject>
              )}
            </g>
          );
        })}

        {/* Patterns */}
        <defs>
          <pattern id="grass-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
             <circle cx="2" cy="2" r="1" fill="black" />
             <circle cx="10" cy="12" r="1" fill="black" />
          </pattern>
        </defs>
      </svg>

      {/* Hover Popup Tooltip */}
      {hoveredAnimal && (
        <div 
          className="absolute z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full pb-4"
          style={{ 
            left: mousePos.x, 
            top: mousePos.y, 
          }}
        >
          <div className="bg-white rounded-lg shadow-xl p-3 w-64 border-2 border-forest-500 animate-in fade-in zoom-in duration-200">
            <div className="flex items-start gap-3">
              <img 
                src={hoveredAnimal.images[0]} 
                alt={hoveredAnimal.name}
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/50x50?text=?'; }}
                className="w-12 h-12 rounded-md object-cover bg-gray-100"
              />
              <div>
                <h4 className="font-bold text-forest-900 text-sm leading-tight mb-1">{hoveredAnimal.name}</h4>
                <p className="text-xs text-gray-500 line-clamp-2">{hoveredAnimal.shortDescription}</p>
              </div>
            </div>
          </div>
          {/* Arrow */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[-50%] w-4 h-4 bg-white rotate-45 border-b-2 border-r-2 border-forest-500"></div>
        </div>
      )}

      {/* Map Legend/UI */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-md border border-[#8c603f] max-w-xs z-10">
         <div className="flex items-center gap-2 mb-1">
            <MapPin className="text-red-500" size={16} />
            <span className="font-bold text-[#8c603f] text-sm">Карта комплекса</span>
         </div>
         <p className="text-xs text-gray-600">
            Нажмите на зеленые зоны,<br/>чтобы узнать о животных.
         </p>
      </div>
    </div>
  );
};

export default MapBoard;