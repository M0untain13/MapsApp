import React, { createContext, useContext, useState } from 'react';
import { Region } from '@/models/Region';

interface RegionContextType {
    region: Region;
    setRegion: React.Dispatch<React.SetStateAction<Region>>;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const INITIAL_REGION = {
        latitude: 58.01,
        longitude: 56.25,
        latitudeDelta: 1,
        longitudeDelta: 1,
    };
    const [region, setRegion] = useState<Region>(INITIAL_REGION);

    return (
        <RegionContext.Provider value={{ region, setRegion }}>
            {children}
        </RegionContext.Provider>
    );
};

export const useRegionContext = () => {
    const context = useContext(RegionContext);
    if (!context) {
        throw new Error('useRegionContext must be used within a RegionProvider');
    }
    return context;
};
