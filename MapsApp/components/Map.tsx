import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { MarkerData } from '@/types';
import { useDatabaseContext } from '@/contexts/DatabaseContext';
import { useRegionContext } from '@/contexts/RegionProvider';
import 'react-native-get-random-values';

const Map = () => {
  const router = useRouter();
  const { addMarker, getMarkers } = useDatabaseContext();
  const { region, setRegion } = useRegionContext();
  const [ markers, setMarkers ] = useState<MarkerData[]>([]);

  const firstFillMarkers = async () => {
    setMarkers(await getMarkers());
  }
  useEffect(() => {firstFillMarkers()}, [])

  const handleLongPress = async (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    addMarker(latitude, longitude);
    setMarkers(await getMarkers())
  };

  const handleMarkerPress = (marker: MarkerData) => {
    router.push(`/marker/${marker.id}`);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        style={{ flex: 1 }}
        onLongPress={handleLongPress}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;
