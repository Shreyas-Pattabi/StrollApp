import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const MapNavigation = () => {
    return (
      <View style = {styles.container}>
        <MapView
          style = {styles.map}
          provider = {PROVIDER_GOOGLE}
          initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  };

  export default MapNavigation;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });

