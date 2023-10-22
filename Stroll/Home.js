import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [zipCode, setZipCode] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const navigation = useNavigation();

  const handleZipCodeChange = (text) => {
    setZipCode(text);
  };

  const handleSearch = () => {
    if (zipCode) {
      alert(`You entered zip code: ${zipCode}`);
    } else if (currentLocation) {
      alert(`Your current location is: ${currentLocation.coords.latitude}, ${currentLocation.coords.longitude}`);
    }
    setSearchInitiated(true);
  };

  const findCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation(position);
      },
      (error) => {
        console.error(error);
        alert('Failed to retrieve your current location. Please enter a zip code.');
      }
    );
    setSearchInitiated(true);
  };

  const fetchNearbyLocations = () => {
    const fetchedLocations = [
      { name: 'Restaurant A', type: 'restaurant' },
      { name: 'Shop B', type: 'shop' },
      { name: 'Park C', type: 'park' },
      { name: 'Cafe D', type: 'cafe' },
    ];
    setNearbyLocations(fetchedLocations);
  };

  const handleLocationClick = (location) => {
    navigation.navigate('MapNavigation');
  };

  useEffect(() => {
    if (searchInitiated) {
      fetchNearbyLocations();
    }
  }, [searchInitiated]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Start Your Stroll</Text>
      <View style={styles.optionContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Zip Code"
          value={zipCode}
          onChangeText={handleZipCodeChange}
          keyboardType="numeric"
        />
        <Button title="Search" onPress={handleSearch} color="darkgray" />
        <Button title="Find My Current Location" onPress={findCurrentLocation} color="darkgray" />
      </View>
      {currentLocation && (
        <Text style={styles.locationText}>
          Your current location: {currentLocation.coords.latitude}, {currentLocation.coords.longitude}
        </Text>
      )}
      {searchInitiated && nearbyLocations.length > 0 && (
        <Text style={styles.locationsHeading}>Nearby Locations:</Text>
      )}
      {searchInitiated &&
        nearbyLocations.map((location, index) => (
          <TouchableOpacity key={index} onPress={() => handleLocationClick(location)}>
            <Text style={styles.locationText}>{location.name}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lavender',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'dimgray',
  },
  optionContainer: {
    alignItems: 'center',
    margin: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'darkgray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  locationText: {
    fontSize: 16,
    marginVertical: 5,
    color: 'blue',
  },
});

export default Home;
