import React, { createContext, useContext, useState } from 'react';
import { MarkerData } from '@/types';

interface MarkerContextType {
  markers: MarkerData[];
  setMarkers: React.Dispatch<React.SetStateAction<MarkerData[]>>;
  updateMarker: (id: string, updatedMarker: MarkerData) => void;
}

const MarkerContext = createContext<MarkerContextType | undefined>(undefined);

export const MarkerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const updateMarker = (id: string, updatedMarker: MarkerData) => {
    setMarkers(prevMarkers => prevMarkers.map(marker => marker.id === id ? updatedMarker : marker));
  };
  return (
    <MarkerContext.Provider value={{ markers, setMarkers, updateMarker }}>
      {children}
    </MarkerContext.Provider>
  );
};

export const useMarkerContext = () => {
  const context = useContext(MarkerContext);
  if (!context) {
    throw new Error('useMarkerContext must be used within a MarkerProvider');
  }
  return context;
};
