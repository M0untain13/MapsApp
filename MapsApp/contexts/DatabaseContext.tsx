import React, { createContext, useContext } from 'react';
import { MarkerData } from '@/models/MarkerData';
import { ImageData } from '@/models/ImageData';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DatabaseContextType {
  addMarker: (latitude: number, longitude: number) => Promise<void>;
  deleteMarker: (id: string) => Promise<void>;
  getMarkers: () => Promise<MarkerData[]>;

  addImage: (markerId: string, uri: string) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  getMarkerImages: (markerId: string) => Promise<ImageData[]>;
}

export const TryAction: (action: () => Promise<void>) => Promise<void> = async (action) => {
    try {
        await action();
    } catch (error) {
        console.error(error);
    }
}

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const addMarker = async (latitude: number, longitude: number) => {
        TryAction(async () => {
            await prisma.markerData.create({
                data: {
                    latitude,
                    longitude,
                },
            });
        });
        
    }
    const deleteMarker = async (id: string) => {
        await prisma.ImageData.deleteMany({
            where: {
                markerId: id,
            },
        });
        await prisma.markerData.delete({
            where: { id },
        });
    }
    const getMarkers = async () => {
        return await prisma.markerData.findMany();
    }

    const addImage = async (markerId: string, uri: string) => {
        await prisma.imageData.create({
            data: {
                markerId,
                uri,
            },
        });
    }
    const deleteImage = async (id: string) => {
        await prisma.imageData.delete({
            where: { id },
        });
    }
    const getMarkerImages = async (markerId: string) => {
        return await prisma.imageData.findMany({
            where: { markerId },
        });
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

function action(prisma: any, any: any) {
    throw new Error('Function not implemented.');
}
