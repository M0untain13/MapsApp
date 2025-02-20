import React from 'react';
import { Text } from 'react-native';
import MarkerDetailsScreen from '@/components/MarkerDetailsScreen';
import { useLocalSearchParams } from 'expo-router';
import { useMarkerContext } from '@/components/MarkerProvider';

const MarkerPage = () => {
    const { id } = useLocalSearchParams();
    const markerId = Array.isArray(id) ? id[0] : id;

    const { markers } = useMarkerContext();
    const marker = markers.find(marker => marker.id === markerId);

    if (!marker) {
        return (
            <Text>Маркер не найден...</Text>
        );
    }
    else {
        return (
            <MarkerDetailsScreen marker={marker} />
        );
    }
};

export default MarkerPage;
