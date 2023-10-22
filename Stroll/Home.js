import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSearch = () => {
    navigation.navigate('MapNavigation');
  };

  const handleFindRewards = () => {
    navigation.navigate('Rewards');
  };

  const handleChallenge = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Start Your Stroll</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Find My Current Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.greenButton]}
          onPress={handleFindRewards}
        >
          <Text style={[styles.buttonText, styles.blackButtonText]}>Find Rewards</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.challengeButton} onPress={handleChallenge}>
        <Text style={styles.challengeButtonText}>Daily Challenge</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Daily Challenge: Walk 5 miles</Text>
            <Text style={styles.modalText}>Earn 10 points</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D8BFD8', 
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 20,
  },
  button: {
    backgroundColor: 'white', 
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    width: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  greenButton: {
    backgroundColor: 'black', 
  },
  blackButtonText: {
    color: 'white', 
  },
  challengeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'black',
    borderRadius: 20, 
    padding: 16,
  },
  challengeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default Home;
