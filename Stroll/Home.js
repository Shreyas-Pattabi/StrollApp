import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const Home = () => {
  const [zipCode, setZipCode] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchInitiated, setSearchInitiated] = useState(false); // Track if search has been initiated

  const handleZipCodeChange = (text) => {
    setZipCode(text);
  };

  const handleSearch = () => {
    if (zipCode) {
      alert(`You entered zip code: ${zipCode}`);
    } else if (currentLocation) {
      alert(`Your current location is: ${currentLocation.coords.latitude}, ${currentLocation.coords.longitude}`);
    }
    setSearchInitiated(true); // Set searchInitiated to true
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
    setSearchInitiated(true); // Set searchInitiated to true
  };

  const fetchNearbyLocations = () => {
    // Hypothetical: Fetch nearby locations using an API
    const fetchedLocations = [
      { name: 'Restaurant A', type: 'restaurant' },
      { name: 'Shop B', type: 'shop' },
      { name: 'Park C', type: 'park' },
      { name: 'Cafe D', type: 'cafe' },
    ];
    setNearbyLocations(fetchedLocations);
  };

  useEffect(() => {
    if (searchInitiated) {
      fetchNearbyLocations();
    }
  }, [searchInitiated]);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    // Handle location click as needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Start Your Stroll</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Zip Code"
        value={zipCode}
        onChangeText={handleZipCodeChange}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
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
        fontSize: 30, // Increase the font size
        fontWeight: 'bold', // Make it bold
        marginBottom: 20,
        fontFamily: 'YourCustomFont',
        color: 'gray',
      },
      input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
      },
      buttonContainer: {
        alignItems: 'center',
      },

  locationText: {
    fontSize: 16,
    marginVertical: 5,
    color: 'blue',
  },

 


});

export default Home;
