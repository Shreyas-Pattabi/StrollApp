import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const handleSearch = () => {
    // Navigate to the MapNavigation screen
    navigation.navigate('MapNavigation');
  };

  const handleFindRewards = () => {
    // Navigate to the Rewards screen
    navigation.navigate('Rewards');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Start Your Stroll</Text>
      <View style={styles.optionContainer}>
        <View style={styles.buttonBox}>
          <Button title="Find My Current Location" onPress={handleSearch} color="indigo" />
        </View>
        <View style={styles.buttonBox}>
          <Button title="Find Rewards" onPress={handleFindRewards} color="green" />
        </View>
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
  buttonBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
});

export default Home;
