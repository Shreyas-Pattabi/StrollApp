import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Alert, Text, TextInput, Pressable } from 'react-native';
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

  useEffect(() => {
    const getPermissions = async() => {
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
    fetch (
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=restaurant&key=${API_KEY}`
      )
      .then(response => response.json())
      .then(response => setPlaces(response.results))
      .catch(error => console.error(error));
  }, [latitude, longitude]);

  const beginWalk = () => {
    if (destination) {
      setWalking(true);
      setDestination(null);
    }
  }

  const endWalk = () => {
    setWalking(false);
    setDestination(null);
  }

  return (
    
    <View style = {styles.container}>
      <MapView
          style={styles.mapPlaceholder}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.05
          }}>
        
        {places.map(place => (
          <Marker 
            key = {place.id}
            coordinate={{latitude: place.geometry.location.lat, longitude: place.geometry.location.lng}}
            title = {place.name}
            onPress = {() => setDestination(place)}
          />
      ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    fontSize: 18,
  },
});

export default MapNavigation;
