import React, { useState, useRef } from 'react';
import { Button, View, StyleSheet, Alert, Modal, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import uuid from 'react-native-uuid';

const App = () => {
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const mapRef = useRef(null);
    const lastTap = useRef(0); // Для отслеживания двойного нажатия

  const handleAddMarker = async () => {
    if (mapRef.current) {
      // Получаем текущие координаты центра карты
      const camera = await mapRef.current.getCamera();
      const center = {
        latitude: camera.center.latitude,
        longitude: camera.center.longitude,
      };

      // Создаем новый маркер
      const newMarker = {
        coordinate: center,
        key: uuid.v4(),
      };

      // Добавляем маркер в массив
      setMarkers([...markers, newMarker]);
    }
  };

  const handleTap = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>

      <MapView
        ref={mapRef} // Привязываем ссылку к MapView
        style={styles.map}
        initialRegion={{
          latitude: 58.01111490882511,
          longitude: 56.237541072001555,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.key}
            coordinate={marker.coordinate}
            onPress={() => handleTap(marker)}
          />
        ))}
      </MapView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Маркер {selectedMarker?.key}:
              {"\n"}
              Широта: {selectedMarker?.coordinate.latitude.toFixed(4)}
              {"\n"}
              Долгота: {selectedMarker?.coordinate.longitude.toFixed(4)}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.buttonContainer}>
        <Button
          title="Добавить маркер в центр"
          onPress={handleAddMarker}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;