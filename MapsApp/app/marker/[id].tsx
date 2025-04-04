import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import MarkerDetailsScreen from '@/components/MarkerDetailsScreen';
import { useLocalSearchParams } from 'expo-router';
import { useDatabaseContext } from '@/contexts/DatabaseContext';
import { MarkerData } from '@/models/MarkerData';

const MarkerPage = () => {
    const { id } = useLocalSearchParams();
    const markerId = Array.isArray(id) ? id[0] : id;
    const [ marker, setMarker ] = useState<MarkerData | undefined>(undefined);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const { getMarkers } = useDatabaseContext();

    const firstFillMarkers = async () => {
        setMarker((await getMarkers()).find(marker => marker.id === markerId));
        setIsLoading(false);
    }
    useEffect(() => {firstFillMarkers()}, [])

    if (isLoading) {
        return (
            <Text>Загрузка...</Text>
        );
    }
    else {
        if(!marker){
            return (
                <Text>Маркер не найден!</Text>
            );
        } else {
            return (
                <MarkerDetailsScreen marker={marker} />
            );
        }
    }
};

export default MarkerPage;
