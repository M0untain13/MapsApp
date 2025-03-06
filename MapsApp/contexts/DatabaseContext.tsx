import React, { createContext, useContext, useState } from 'react';
import { MarkerData, ImageData } from '@/types';

interface DatabaseContextType {
  addMarker: (latitude: number, longitude: number) => Promise<void>;
  deleteMarker: (id: string) => Promise<void>;
  getMarkers: () => Promise<MarkerData[]>;

  addImage: (markerId: string, uri: string) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  getMarkerImages: (markerId: string) => Promise<ImageData[]>;
}

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const addMarker = async (latitude: number, longitude: number) => {

    }
    const deleteMarker = async (id: number) => {

    }
    const getMarkers = async () => {
        return [];
    }

    const addImage = async (markerId: number, uri: string) => {

    }
    const deleteImage = async (id: number) => {

    }
    const getMarkerImages = async (markerId: number) => {
        return [];
    }
    return (
        <DatabaseContext.Provider value={{addMarker, deleteMarker, getMarkers, addImage, deleteImage, getMarkerImages}}>
            {children}
        </DatabaseContext.Provider>
    )
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const useDatabaseContext = () => {
    const context = useContext(DatabaseContext);
    if(!context){
        throw new Error('useDatabaseContext must be used within a DatabaseProvider');
    }
    return context;
}