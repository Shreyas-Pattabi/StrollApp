import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const API_KEY = 'AIzaSyCNu5kihZoY0HrqgnC9i2WebzfUQ2Bxxj4'; // Replace with your actual Google Maps API key

const MapNavigation = ({ route }) => {
  const { zipCode } = route.params;
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (zipCode) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=AIzaSyCNu5kihZoY0HrqgnC9i2WebzfUQ2Bxxj4`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'OK' && data.results.length > 0) {
            const result = data.results[0];
            const location = result.geometry.location;
            setCoordinates({ latitude: location.lat, longitude: location.lng });
          } else {
            Alert.alert('Geocoding failed', 'No results found for the provided ZIP code.');
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert('Geocoding failed', 'An error occurred while geocoding.');
        });
    }
  }, [zipCode]);

  return (
    <View style={styles.container}>
      {coordinates ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      ) : (
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>Geocoding in progress...</Text>
        </View>
      )}
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
