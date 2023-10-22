import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [zipCode, setZipCode] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigation = useNavigation();

  const handleZipCodeChange = (text) => {
    setZipCode(text);
  };

  const handleSearch = () => {
    if (zipCode) {
      // Navigate to the MapNavigation screen and pass the zip code as a parameter
      navigation.navigate('MapNavigation', { zipCode });
    }
  };

  const findCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Navigate to the MapNavigation screen and pass the latitude and longitude as parameters
        navigation.navigate('MapNavigation', { latitude, longitude });
      },
      (error) => {
        console.error(error);
        alert('Failed to retrieve your current location. Please enter a zip code.');
      }
    );
  };

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
        <Button title="Search" onPress={handleSearch} color="black" />
        <Button title="Find My Current Location" onPress={findCurrentLocation} color="indigo" />
      </View>
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
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'dimgray',
  },
  optionContainer: {
    alignItems: 'center',
    margin: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'dimgray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default Home;
