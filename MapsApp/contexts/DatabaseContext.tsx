import React, { createContext, useContext, useEffect } from 'react';
import { MarkerData } from '@/models/MarkerData';
import { ImageData } from '@/models/ImageData';
import { DbContext } from '@/db/DbContext';

interface DatabaseContextType {
    addMarker: (latitude: number, longitude: number) => Promise<void>;
    deleteMarker: (id: string) => Promise<void>;
    getMarkers: () => Promise<MarkerData[]>;

    addImage: (markerId: string, uri: string) => Promise<void>;
    deleteImage: (id: string) => Promise<void>;
    getMarkerImages: (markerId: string) => Promise<ImageData[]>;
}

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const addMarker = async (latitude: number, longitude: number) => {
        try{
            const context = new DbContext();
            var marker = new MarkerData(latitude, longitude);
            await context.addMarker(marker);
        }
        catch(e){
            console.error(e)
        }
    };

    const deleteMarker = async (id: string) => {
        var images = await getMarkerImages(id);
        const context = new DbContext();
        images.forEach(image => {
            context.deleteImage(image.id);
        });
        context.deleteMarker(id);
    };

    const getMarkers = async () => {
        const context = new DbContext();
        return (await context.getMarkers()).map(
            (e) => {
                var m = new MarkerData(e.latitude, e.longitude);
                m.id = e.id;
                return m;
            }
        );
    };

    const addImage = async (markerId: string, uri: string) => {
        const context = new DbContext();
        var image = new ImageData(uri, markerId);
        await context.addImage(image);
    };

    const deleteImage = async (id: string) => {
        const context = new DbContext();
        context.deleteImage(id);
    };

    const getMarkerImages = async (markerId: string) => {
        const context = new DbContext();
        return (await context.getMarkerImages(markerId)).map(
            (e) => {
                var image = new ImageData(e.uri, e.markerId);
                image.id = e.id;
                return image;
            }
        );
    };

    return (
        <DatabaseContext.Provider value={{ addMarker, deleteMarker, getMarkers, addImage, deleteImage, getMarkerImages }}>
            {children}
        </DatabaseContext.Provider>
    )
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const useDatabaseContext = () => {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error('useDatabaseContext must be used within a DatabaseProvider');
    }
    return context;
}

function action(prisma: any, any: any) {
    throw new Error('Function not implemented.');
}
