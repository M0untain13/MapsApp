import React, { createContext, useContext, useState, useEffect } from 'react';
import { MarkerData, ImageData } from '@/types';
import { Session } from './ConnectSession';
import { DataSource } from 'typeorm';

interface DatabaseContextType {
  addMarker: (latitude: number, longitude: number) => Promise<void>;
  deleteMarker: (id: string) => Promise<void>;
  getMarkers: () => Promise<MarkerData[]>;

  addImage: (markerId: string, uri: string) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  getMarkerImages: (markerId: string) => Promise<ImageData[]>;
}

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const initDatabase = async () => {
        Session(async (datasource : DataSource) => {
            await datasource.initialize();
        })
    }
    useEffect(() => {initDatabase()}, [])

    const addMarker = async (latitude: number, longitude: number) => {
        Session(async (datasource : DataSource) => {
            const markerRepository = datasource.getRepository(MarkerData);
            const marker = new MarkerData();
            marker.latitude = latitude;
            marker.longitude = longitude;
            await markerRepository.save(marker);
        })
    }
    const deleteMarker = async (id: string) => {
        Session(async (datasource : DataSource) => {
            const imageRepository = datasource.getRepository(ImageData);
            const markerRepository = datasource.getRepository(MarkerData);

            const images = await imageRepository.find({ where: { markerId: id } });
            await imageRepository.remove(images);

            const marker = await markerRepository.findOne({ where: { id: id } });
            if (marker) {
                await markerRepository.remove(marker);
            }
        })
    }
    const getMarkers = async () => {
        let markers : MarkerData[] = [];
        Session(async (datasource : DataSource) => {
            const markerRepository = datasource.getRepository(MarkerData);
            markers = await markerRepository.find();
        })
        return markers;
    }

    const addImage = async (markerId: string, uri: string) => {
        Session(async (datasource : DataSource) => {
            const imageRepository = datasource.getRepository(ImageData);
            const image = new ImageData();
            image.url = uri;
            image.markerId = markerId;
            await imageRepository.save(image);
        })
    }
    const deleteImage = async (id: string) => {
        Session(async (datasource : DataSource) => {
            const imageRepository = datasource.getRepository(ImageData);
            const image = await imageRepository.findOne({ where: { id: id } });
            if (image) {
                await imageRepository.remove(image);
            }
        })
    }
    const getMarkerImages = async (markerId: string) => {
        let images : ImageData[] = [];
        Session(async (datasource : DataSource) => {
            const imageRepository = datasource.getRepository(ImageData);
            images = await imageRepository.find({ where: { markerId: markerId } });
        })
        return images;
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