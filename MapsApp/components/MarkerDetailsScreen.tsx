import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MarkerData } from '@/types';
import { useDatabaseContext } from '@/contexts/DatabaseContext';
import { ImageData } from '@/types';

const MarkerDetailsScreen = ({ marker }: { marker: MarkerData }) => {
  const router = useRouter();
  const [images, setImages] = useState<ImageData[]>([]);
  const { deleteMarker, addImage, deleteImage, getMarkerImages } = useDatabaseContext();

  const firstFillImages = async () => {
    setImages(await getMarkerImages(marker.id));
  }
  useEffect(() => {firstFillImages()}, [])

  const getImageFromPicker = async () => {
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
        if (!result.canceled) {
          await addImage(marker.id, asset.uri);
        }
      })
    }
  }
  
  const deleteMarkerHandler = async () => {
    await deleteMarker(marker.id);
    router.push('/');
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>Ширина: {marker.latitude}</Text>
        <Text>Долгота: {marker.longitude}</Text>
      </View>
      <View style={styles.imagesContainer}>
        {images.map(image => (
          <View key={image.id} style={styles.imageContainer}>
            <Image source={{ uri: image.url }} style={styles.image} />
            <Button title="Удалить изображение" onPress={() => deleteImage(image.id)} />
          </View>
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Добавить изображение" onPress={getImageFromPicker} />
        <Button title="Удалить маркер" onPress={deleteMarkerHandler} />
        <Button title="Вернуться" onPress={() => router.push('/')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  infoContainer: {
    padding: 16,
  },
  imagesContainer: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
});

export default MarkerDetailsScreen;
