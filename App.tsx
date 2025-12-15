import React, { useState } from 'react';
import MapBoard from './components/MapBoard';
import AnimalPanel from './components/AnimalPanel';
import { ANIMALS, MAP_ZONES } from './constants';
import { Trees } from 'lucide-react';

const App: React.FC = () => {
  // We track both zone ID (for highlighting the map) and animal ID (for the sidebar)
  const [activeZoneId, setActiveZoneId] = useState<string | null>(null);
  const [activeAnimalId, setActiveAnimalId] = useState<string | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const activeAnimal = activeAnimalId ? ANIMALS[activeAnimalId] : null;

  const handleZoneClick = (zoneId: string, animalId: string) => {
    setActiveZoneId(zoneId);
    setActiveAnimalId(animalId);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setActiveZoneId(null);
    setActiveAnimalId(null);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-forest-50 text-wood-900">
      
      {/* Navbar */}
      <header className="flex-none h-16 bg-white border-b border-forest-100 px-4 flex items-center justify-between shadow-sm z-30 relative">
        <div className="flex items-center gap-2 text-forest-700">
          <Trees className="w-8 h-8" />
          <h1 className="font-bold text-lg md:text-xl tracking-tight leading-none">
            Вольерный комплекс<br/>
            <span className="text-forest-500 font-normal">«Лаура»</span>
          </h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex overflow-hidden">
        
        {/* Map Area */}
        <div className="flex-1 relative p-2 sm:p-4 overflow-hidden">
          <MapBoard 
            zones={MAP_ZONES} 
            activeZoneId={activeZoneId} 
            onZoneClick={handleZoneClick} 
          />
        </div>

        {/* Info Sidebar (Desktop: Right Side, Mobile: Drawer) */}
        <div 
          className={`
            fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
            sm:relative sm:transform-none sm:w-[350px] sm:shadow-none sm:border-l sm:border-forest-100
            ${!isSidebarOpen && 'sm:hidden'} 
          `}
        >
          <AnimalPanel 
            animal={activeAnimal} 
            onClose={handleCloseSidebar}
          />
        </div>
      </main>
    </div>
  );
};

export default App;