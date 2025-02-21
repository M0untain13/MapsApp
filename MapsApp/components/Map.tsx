import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { MarkerData } from '@/types';
import { useMarkerContext } from '@/components/MarkerProvider';
import { useRegionContext } from './RegionProvider';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'

const Map = () => {
  const router = useRouter();
  const { markers, setMarkers } = useMarkerContext();
  const { region, setRegion } = useRegionContext();

  const handleLongPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const newMarker: MarkerData = { id: uuid(), latitude, longitude, images: [] };
    setMarkers([...markers, newMarker]);
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
