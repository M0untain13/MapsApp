import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MarkerData } from '@/types';
import { useMarker } from '@/hooks/useMarker';

const MarkerDetailsScreen = ({ marker }: { marker: MarkerData }) => {
 const router = useRouter();
 const { addImage, removeImage } = useMarker(marker.id);

 return (
   <View style={styles.container}>
     <View style={styles.infoContainer}>
       <Text>Ширина: {marker.latitude}</Text>
       <Text>Долгота: {marker.longitude}</Text>
     </View>
     <View style={styles.imagesContainer}>
       {marker.images.map(image => (
         <View key={image.id} style={styles.imageContainer}>
           <Image source={{ uri: image.url }} style={styles.image} />
           <Button title="Удалить" onPress={() => removeImage(image.id)} />
         </View>
       ))}
     </View>
     <View style={styles.buttonsContainer}>
       <Button title="Добавить изображение" onPress={addImage} />
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
