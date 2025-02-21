import { useMarkerContext } from '@/components/MarkerProvider';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'

const useMarker = (id: string) => {
  const { markers, updateMarker } = useMarkerContext();
  const marker = markers.find(marker => marker.id === id);

  const addImage = async () => {
    if (marker) {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Не хватает прав!');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      result.assets?.map(async (asset) => {
        let newImage = {
          id: uuid(),
          url: asset.uri,
        };
        if (!result.canceled) {
          updateMarker(marker.id, { ...marker, images: [...marker.images, newImage] });
        }
      })
    }
  };

  const removeImage = (imageId: string) => {
    if (marker) {
      updateMarker(marker.id, { ...marker, images: marker.images.filter(i => i.id !== imageId) });
    }
  };

  return { marker, addImage, removeImage };
};

export { useMarker };
