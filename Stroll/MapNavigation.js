import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const API_KEY = 'AIzaSyCNu5kihZoY0HrqgnC9i2WebzfUQ2Bxxj4';

const MapNavigation = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [places, setPlaces] = useState([]);
  const [destination, setDestination] = useState(null);
  const [walking, setWalking] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLatitude(currentLocation.coords.latitude);
      setLongitude(currentLocation.coords.longitude);
    };
    getPermissions();
  }, []);

  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=10000&type=restaurant&key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => setPlaces(response.results))
      .catch((error) => console.error(error));
  }, [latitude, longitude]);

  const getDirections = () => {
    if (destination) {
      const destinationLatLng = `${destination.geometry.location.lat},${destination.geometry.location.lng}`;
      const originLatLng = `${latitude},${longitude}`;
      fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${originLatLng}&destination=${destinationLatLng}&key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((response) => {
          setWalking(true);
          setDirections(response);
        })
        .catch((error) => console.error(error));
      setModalVisible(false);
    }
  };

  const endWalk = () => {
    setWalking(false);
    setDestination(null);
    setDirections(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation
        style={styles.mapPlaceholder}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.05,
        }}>
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            title={place.name}
            onPress={() => {
              setDestination(place);
              setModalVisible(true);
            }}
          />
        ))}
      </MapView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{destination?.name}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.getDirectionsButton}
                onPress={getDirections}
              >
                <Text style={styles.getDirectionsButtonText}>Get Directions</Text>
              </TouchableOpacity>
              <Button title="Close" onPress={endWalk} color="violet" />
            </View>
          </View>
        </View>
      </Modal>

      {walking && destination && directions && (
        <View style={styles.directionsContainer}>
          <Text style={styles.directionsHeader}>Turn-by-Turn Directions</Text>
          {directions.routes[0].legs[0].steps.map((step, index) => (
            <View key={index} style={styles.directionsStep}>
              <Text>{index + 1}. {step.html_instructions.replace(/<[^>]*>/g, '')}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  getDirectionsButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 16,
    width: 150,
    alignItems: 'center',
  },
  getDirectionsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  directionsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    padding: 20,
    marginTop: 20,
  },
  directionsHeader: {
    fontSize: 18,
    marginBottom: 10,
  },
  directionsStep: {
    marginBottom: 5,
  },
});

export default MapNavigation;
